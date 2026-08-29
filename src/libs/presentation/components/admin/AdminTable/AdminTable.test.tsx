/**
 * AdminTable Component Tests
 */

import { AdminTable, AdminTableCell, AdminTableRow } from './AdminTable';

describe('AdminTable', () => {
  it('exports table components', () => {
    expect(AdminTable).toBeDefined();
    expect(AdminTableRow).toBeDefined();
    expect(AdminTableCell).toBeDefined();
  });
});
