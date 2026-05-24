"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = {
  firstName: string;
  company:   string;
  email:     string;
  reason:    string;
};

type Errors = Partial<FormState>;

const EMPTY: FormState = { firstName: "", company: "", email: "", reason: "" };

/* ── Input / Textarea field ────────────────────────────────────────────── */
function Field({
  id, label, type = "text", textarea = false, value, error,
  onChange,
}: {
  id:        keyof FormState;
  label:     string;
  type?:     string;
  textarea?: boolean;
  value:     string;
  error?:    string;
  onChange:  (val: string) => void;
}) {
  const base =
    "w-full bg-transparent text-paper text-[15px] font-light outline-none pb-3 transition-colors duration-200 placeholder:text-paper/10 border-b " +
    (error ? "border-red-400" : "border-paper/15 focus:border-acid");

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[10px] font-semibold tracking-[0.22em] uppercase text-paper/40"
      >
        {label} <span className="text-acid">*</span>
      </label>

      {textarea ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}

      {error && (
        <span className="text-[10px] text-red-400 tracking-wide">{error}</span>
      )}
    </div>
  );
}

/* ── Modal ─────────────────────────────────────────────────────────────── */
export default function ContactModal() {
  const [open,   setOpen]   = useState(false);
  const [form,   setForm]   = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  /* Listen for global open event */
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("apex:contact", handler);
    return () => window.removeEventListener("apex:contact", handler);
  }, []);

  /* Escape key */
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  });

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => { setForm(EMPTY); setErrors({}); setStatus("idle"); }, 450);
  }, []);

  const set = (key: keyof FormState) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.company.trim())   e.company   = "Company name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "A valid email address is required";
    if (!form.reason.trim())    e.reason    = "Please tell us why you're reaching out";
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ───────────────────────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-[200] bg-ink/85 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          />

          {/* ── Panel ──────────────────────────────────────────────────── */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-5 md:p-8">
            <motion.div
              className="relative w-full max-w-[520px] bg-[#0C0C0A] overflow-hidden"
              style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(242,240,236,0.07)" }}
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{   opacity: 0, y: 16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Acid top rule */}
              <div className="h-[2px] w-full bg-acid" />

              <div className="px-8 md:px-10 pt-8 pb-10">
                {/* Close button */}
                <button
                  onClick={close}
                  aria-label="Close"
                  data-cursor="CLOSE"
                  className="absolute top-6 right-7 text-paper/25 hover:text-paper transition-colors duration-200 text-2xl leading-none font-light"
                >
                  ×
                </button>

                {/* ── Success state ───────────────────────────────────── */}
                {status === "success" ? (
                  <motion.div
                    className="flex flex-col gap-5 py-6"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-[10px] font-semibold tracking-[0.24em] uppercase text-acid">
                      Message Sent ✓
                    </span>
                    <h2
                      className="font-display font-black uppercase text-paper leading-none"
                      style={{ fontSize: "clamp(38px, 7vw, 54px)" }}
                    >
                      We&apos;ll be<br />in touch.
                    </h2>
                    <p className="text-paper/45 text-[14px] leading-[1.8] font-light">
                      Thanks, {form.firstName}. The Apex team will reply within 24 hours — keep an eye on <span className="text-paper/70">{form.email}</span>.
                    </p>
                    <button
                      onClick={close}
                      data-cursor="GO"
                      className="mt-3 w-fit text-[10px] font-display font-black tracking-[0.18em] uppercase text-paper/35 hover:text-paper transition-colors border-b border-paper/15 hover:border-paper/40 pb-px"
                    >
                      Close ×
                    </button>
                  </motion.div>

                ) : (
                  /* ── Form state ───────────────────────────────────── */
                  <>
                    <div className="mb-8">
                      <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-acid mb-3">
                        Partnership Inquiry
                      </p>
                      <h2
                        className="font-display font-black uppercase text-paper leading-[0.92]"
                        style={{ fontSize: "clamp(36px, 6vw, 50px)" }}
                      >
                        Get in<br />Touch.
                      </h2>
                      <p className="mt-3 text-[13px] text-paper/35 font-light leading-relaxed">
                        Fill out the form and our partnership team will be in touch within 24 hours.
                      </p>
                    </div>

                    <form onSubmit={submit} noValidate className="flex flex-col gap-7">
                      <Field
                        id="firstName" label="First Name"
                        value={form.firstName} error={errors.firstName}
                        onChange={set("firstName")}
                      />
                      <Field
                        id="company" label="Company Name"
                        value={form.company} error={errors.company}
                        onChange={set("company")}
                      />
                      <Field
                        id="email" label="Email Address" type="email"
                        value={form.email} error={errors.email}
                        onChange={set("email")}
                      />
                      <Field
                        id="reason" label="Reason for Contact" textarea
                        value={form.reason} error={errors.reason}
                        onChange={set("reason")}
                      />

                      {status === "error" && (
                        <p className="text-[12px] text-red-400 leading-relaxed">
                          Something went wrong. Try again or email us at{" "}
                          <a href="mailto:imam@apextalentgrp.com" className="underline">
                            imam@apextalentgrp.com
                          </a>
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        data-cursor="GO"
                        className="mt-1 inline-flex items-center justify-center gap-3 bg-acid text-ink text-[10px] font-display font-black tracking-[0.2em] uppercase py-4 px-8 hover:bg-paper transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? (
                          <>
                            <span className="inline-block w-3 h-3 border border-ink/40 border-t-ink rounded-full animate-spin" />
                            Sending…
                          </>
                        ) : (
                          "Submit Request →"
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
