import { requireUnauth } from "@/lib/auth-utils";
import { LoginForm } from "@/modules/auth/components/login-form";

export default async function Page() {
  await requireUnauth();

  return (
    <div>
      <LoginForm />
    </div>
  );
}
