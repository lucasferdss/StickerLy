import { useState } from "react";
import { X } from "lucide-react";
import {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  resetPassword,
} from "@/lib/auth";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    setMessage("");
    setLoading(true);

    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(name, email, password);
      }

      onClose();
    } catch (error: any) {
      setMessage("Não foi possível entrar. Confira seus dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setMessage("");
    setLoading(true);

    try {
      await loginWithGoogle();
      onClose();
    } catch {
      setMessage("Não foi possível entrar com Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!email) {
      setMessage("Digite seu e-mail primeiro.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email);
      setMessage("Enviamos um link de recuperação para seu e-mail.");
    } catch {
      setMessage("Não foi possível enviar o link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xl px-4">
      <div className="w-full max-w-sm rounded-[2rem] bg-[#18181b]/95 border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {mode === "login" ? "Entrar no StickerLy" : "Criar conta"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full h-12 rounded-2xl bg-white text-black font-semibold active:scale-[0.98] transition"
          >
            Continuar com Google
          </button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground py-1">
            <div className="h-px flex-1 bg-white/10" />
            ou
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {mode === "register" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
            className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
          />

          {message && (
            <p className="text-xs text-muted-foreground">{message}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold active:scale-[0.98] transition"
          >
            {loading ? "Carregando..." : mode === "login" ? "Entrar" : "Cadastrar"}
          </button>

          <div className="flex justify-between text-xs text-muted-foreground pt-1">
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setMessage("");
              }}
            >
              {mode === "login" ? "Criar conta" : "Já tenho conta"}
            </button>

            {mode === "login" && (
              <button onClick={handleReset}>
                Esqueci a senha
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}