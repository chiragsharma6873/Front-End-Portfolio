import { useEffect, useRef, useState } from "react";

const EMAIL = "chirag0616sharma@gmail.com";

const Contact = () => {
  const [label, setLabel] = useState("Copy email");
  const emailRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const done = (ok) => {
    setLabel(ok ? "Copied!" : "Press Ctrl+C");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setLabel("Copy email"), 2000);
  };

  // Fallback for browsers / insecure contexts without the Clipboard API:
  // copy through a hidden textarea, or select the address so the user can copy it.
  const fallbackCopy = () => {
    const ta = document.createElement("textarea");
    ta.value = EMAIL;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    if (!ok && emailRef.current) {
      const range = document.createRange();
      range.selectNodeContents(emailRef.current);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
    done(ok);
  };

  const copyEmail = () => {
    setLabel("Copied!");
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(EMAIL).then(() => done(true), fallbackCopy);
    } else {
      fallbackCopy();
    }
  };

  return (
    <section className="x-sec x-contact" id="contact">
      <div className="x-wrap">
        <p className="x-mono reveal">05 / Contact</p>
        <h2 className="x-h2 reveal">
          Let's build something <span className="x-lime">together.</span>
        </h2>
        <p className="x-contact__copy reveal">
          Open to front-end and junior full-stack roles, freelance and
          collaborations.
        </p>
        <div className="x-mail reveal">
          <a href={`mailto:${EMAIL}`} ref={emailRef}>
            {EMAIL}
          </a>
          <button
            className="x-btn x-btn--sm x-copy"
            type="button"
            aria-live="polite"
            data-state={label === "Copy email" ? undefined : "done"}
            onClick={copyEmail}
          >
            {label}
          </button>
        </div>
        <p className="x-loc x-mono reveal">
          <span className="x-pulse" aria-hidden="true" />
          New Delhi, India
        </p>
      </div>
    </section>
  );
};

export default Contact;
