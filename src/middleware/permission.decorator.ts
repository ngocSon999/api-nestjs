import { SetMetadata } from '@nestjs/common';

// Hàm decorator để thêm quyền vào metadata
export const Permissions = (permission: string) =>
  SetMetadata('permission', permission);
