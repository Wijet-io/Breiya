export interface EmailAccount {
  id: string;
  email: string;
  provider: EmailProvider;
  color: string;
  display_name: string | null;
  user_id: string;
  account_permissions?: {
    permission_level: PermissionLevel;
  }[];
}

export type EmailProvider = "gmail" | "outlook" | "imap";
export type PermissionLevel = "read" | "write" | "admin";

export interface EmailAccountFormData {
  email: string;
  provider: EmailProvider;
  displayName?: string;
}

export interface ShareEmailAccountFormData {
  userEmail: string;
  permissionLevel: PermissionLevel;
}