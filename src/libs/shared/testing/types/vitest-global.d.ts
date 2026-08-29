/**
 * Global Vitest Types
 *
 * Type declarations for Vitest mock utilities.
 * Makes Mock, Mocked, and MockedFunction available globally in test files.
 */

import type {
  Mock as VitestMock,
  Mocked as VitestMocked,
  MockedFunction as VitestMockedFunction,
} from 'vitest';

declare global {
  /**
   * Vitest Mock type for mocked functions
   * @example (myFunction as Mock).mockResolvedValue(value)
   */

  type Mock<T extends (...args: any[]) => any = (...args: any[]) => any> = VitestMock<T>;

  /**
   * Vitest Mocked type for mocked objects
   * Uses Vitest's built-in Mocked type which handles complex types better
   * @example const myMockedObj: Mocked<MyType> = vi.mocked(myObj);
   */
  type Mocked<T> = VitestMocked<T>;

  /**
   * Vitest MockedFunction type for specifically mocked functions
   * @example const myMockedFn: MockedFunction<typeof myFn> = vi.fn();
   */
  type MockedFunction<T extends (...args: any[]) => any> = VitestMockedFunction<T>;
}

export {};
