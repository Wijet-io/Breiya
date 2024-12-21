export interface EmailAccount {
  id: string;
  email: string;
  provider: string;
  color: string;
  display_name: string | null;
  user_id: string;
  account_permissions?: {
    permission_level: string;
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