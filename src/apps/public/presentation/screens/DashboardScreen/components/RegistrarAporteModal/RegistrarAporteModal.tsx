'use client';

/**
 * RegistrarAporteModal
 *
 * Captura un aporte. Se abre con el monto del plan ya sugerido, que es lo que
 * el participante aporta casi siempre.
 */

import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Input, Modal } from '@components';
import { registrarAporteValidationSchema } from '@validation';
import { zodResolver } from '@hookform/resolvers/zod';

import { APORTE_MODAL_UI_TEXT } from './RegistrarAporteModal.constants';
import type {
  RegistrarAporteFormData,
  RegistrarAporteModalProps,
} from '../../DashboardScreen.interfaces';

import { AporteFields, ModalFooterActions } from './RegistrarAporteModal.styled';

export const RegistrarAporteModal = ({
  isOpen,
  onClose,
  onSubmit,
  registrando,
  sugerido,
}: RegistrarAporteModalProps) => {
  const { t } = useTranslation();
  const aporteForm = useForm<RegistrarAporteFormData>({
    defaultValues: { monto: String(sugerido), nota: '' },
    mode: 'onBlur',
    resolver: zodResolver(registrarAporteValidationSchema),
  });

  const {
    formState: { errors },
    reset,
    setValue,
    watch,
  } = aporteForm;

  const monto = watch('monto');
  const nota = watch('nota');

  useEffect(() => {
    if (isOpen) {
      reset({ monto: String(sugerido), nota: '' });
    }
  }, [isOpen, reset, sugerido]);

  const handleMontoChange = useCallback(
    (valor: string) => setValue('monto', valor, { shouldValidate: true }),
    [setValue]
  );

  const handleNotaChange = useCallback((valor: string) => setValue('nota', valor), [setValue]);

  const handleConfirm = useCallback(async () => {
    const esValido = await aporteForm.trigger();

    if (!esValido) {
      return;
    }

    await onSubmit(Number(aporteForm.getValues('monto')), aporteForm.getValues('nota'));
  }, [aporteForm, onSubmit]);

  /**
   * Pie propio en vez de `variant='confirm'`: esa variante descarta `children`,
   * así que los campos del formulario no llegarían a pintarse.
   */
  const renderFooter = () => (
    <ModalFooterActions>
      <Button disabled={registrando} variant='secondary' onClick={onClose}>
        {APORTE_MODAL_UI_TEXT.CANCEL}
      </Button>
      <Button loading={registrando} variant='accent' onClick={handleConfirm}>
        {APORTE_MODAL_UI_TEXT.CONFIRM}
      </Button>
    </ModalFooterActions>
  );

  return (
    <Modal
      disableClose={registrando}
      footer={renderFooter()}
      isOpen={isOpen}
      size='sm'
      title={APORTE_MODAL_UI_TEXT.TITLE}
      onClose={onClose}
    >
      <AporteFields>
        <Input
          error={errors.monto ? t(errors.monto.message ?? '') : undefined}
          fullWidth
          id='aporte-monto'
          label={APORTE_MODAL_UI_TEXT.AMOUNT_LABEL}
          name='monto'
          placeholder={APORTE_MODAL_UI_TEXT.AMOUNT_PLACEHOLDER}
          required
          type='text'
          value={monto}
          onChange={handleMontoChange}
        />
        <Input
          error={errors.nota ? t(errors.nota.message ?? '') : undefined}
          fullWidth
          id='aporte-nota'
          label={APORTE_MODAL_UI_TEXT.NOTE_LABEL}
          name='nota'
          placeholder={APORTE_MODAL_UI_TEXT.NOTE_PLACEHOLDER}
          type='text'
          value={nota ?? ''}
          onChange={handleNotaChange}
        />
      </AporteFields>
    </Modal>
  );
};
