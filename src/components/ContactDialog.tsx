import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

type Status = "idle" | "sending" | "sent" | "error";

interface ContactDialogProps {
  productName: string;
  label?: string;
  mobile?: boolean;
}

const fieldClassName =
  "w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm font-thin text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-foreground";

export function ContactDialog({
  productName,
  label = "Contact us",
  mobile = false,
}: ContactDialogProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen && status !== "sending") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Hidden spam trap: real visitors never tick it.
    if (data.get("botcheck")) return;

    if (!accessKey) {
      setStatus("error");
      setErrorMessage("The contact form isn't set up yet. Please email researchdub@gmail.com.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `${productName} direct purchase enquiry`,
          from_name: "Dub Research website",
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Something went wrong.");
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Your message couldn't be sent. Please try again, or email researchdub@gmail.com.",
      );
    }
  };

  return (
    <div className={mobile ? "mt-4 md:hidden" : "hidden w-max md:block"}>
      <Button
        onClick={() => handleOpenChange(true)}
        size={mobile ? "xl" : "default"}
        variant="outline"
        className={cn(
          mobile
            ? "w-full justify-center border-foreground bg-transparent px-4 text-base text-foreground hover:!bg-foreground hover:!text-black"
            : "border-foreground text-foreground font-medium text-xs hover:!bg-foreground hover:!text-black md:text-sm",
        )}
      >
        <Mail data-icon="inline-start" className="mr-0.5" />
        <span>{label}</span>
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="gap-5 rounded-md border border-border p-6 sm:max-w-md">
          <DialogHeader className="gap-2 pr-6">
            <DialogTitle className="text-xl font-normal text-foreground">
              {productName}
            </DialogTitle>
            <DialogDescription className="text-sm font-thin text-foreground">
              These are currently only available as direct. Please message us to
              arrange purchase.
            </DialogDescription>
          </DialogHeader>

          {status === "sent" ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm font-thin text-foreground">
                Thanks, your message has been sent. We'll get back to you by email.
              </p>
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="self-end border-foreground text-foreground hover:!bg-foreground hover:!text-black"
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={fieldClassName}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className={cn(fieldClassName, "resize-y")}
                />
              </label>

              {status === "error" && (
                <p role="alert" className="text-sm font-thin text-red-400">
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                variant="outline"
                disabled={status === "sending"}
                className="self-end border-foreground text-foreground hover:!bg-foreground hover:!text-black"
              >
                {status === "sending" ? "Sending…" : "Send"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
