/**
 * AdminDropdown Component
 *
 * Reusable dropdown component for admin screens.
 * Supports custom positioning and keyboard navigation.
 */

'use client';

import { ChevronDown } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { AdminDropdownProps } from './AdminDropdown.interfaces';

import {
  DropdownContainer,
  DropdownIcon,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from './AdminDropdown.styled';

export const AdminDropdown = ({
  className,
  disabled = false,
  icon,
  onChange,
  options,
  placeholder = 'Seleccionar',
  position = 'bottom',
  value,
}: AdminDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label ?? placeholder;

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  }, [disabled]);

  const handleSelect = useCallback(
    (optionValue: string, optionDisabled?: boolean) => {
      if (optionDisabled) return;
      onChange(optionValue);
      setIsOpen(false);
    },
    [onChange]
  );

  const createSelectHandler = useCallback(
    (optionValue: string, optionDisabled?: boolean) => () =>
      handleSelect(optionValue, optionDisabled),
    [handleSelect]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContainer className={className} ref={containerRef}>
      <DropdownTrigger
        data-open={isOpen}
        disabled={disabled}
        type='button'
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        {icon && <DropdownIcon>{icon}</DropdownIcon>}
        {displayText}
        <ChevronDown size={16} />
      </DropdownTrigger>

      {isOpen && (
        <DropdownMenu $position={position}>
          {options.map((option) => (
            <DropdownItem
              $disabled={option.disabled}
              $selected={option.value === value}
              disabled={option.disabled}
              key={option.value}
              type='button'
              onClick={createSelectHandler(option.value, option.disabled)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export {
  DropdownContainer,
  DropdownIcon,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from './AdminDropdown.styled';
