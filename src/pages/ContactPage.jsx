import { useState } from 'react';
import emailjs from '@emailjs/browser';
import PageShell from '../components/PageShell';
import { profile } from '../data/portfolio';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COOLDOWN_KEY = 'km-contact-last-send';

export function validateContact(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Enter at least two characters.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (values.message.trim().length < 20) errors.message = 'Tell me a little more (20 characters minimum).';
  return errors;
}

export default function ContactPage() {
  const [values, setValues] = useState({ name: '', email: '', message: '', company: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const configured = Boolean(import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_TEMPLATE_ID && import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    if (values.company) return;
    const validation = validateContact(values);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    const lastSent = Number(window.localStorage.getItem(COOLDOWN_KEY) || 0);
    if (Date.now() - lastSent < 60000) {
      setStatus('cooldown');
      return;
    }

    if (!configured) {
      const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\nFrom: ${values.name} <${values.email}>`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('fallback');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, {
        from_name: values.name,
        reply_to: values.email,
        message: values.message,
      }, { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY });
      window.localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      setValues({ name: '', email: '', message: '', company: '' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <PageShell eyebrow="SYS.07 // CONTACT" title="OPEN A CHANNEL" description="Have a system to build, stabilize, or scale? Send the mission parameters." className="contact-page">
      <div className="contact-layout">
        <form className="hud-panel contact-form" onSubmit={submit} noValidate>
          <span className="panel-label">ENCRYPTED TRANSMISSION // TLS</span>
          <label>IDENTIFIER<input name="name" value={values.name} onChange={update} autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
          <label>RETURN CHANNEL<input name="email" type="email" value={values.email} onChange={update} autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
          <label className="message-field">MISSION PARAMETERS<textarea name="message" value={values.message} onChange={update} rows="5" aria-invalid={Boolean(errors.message)} />{errors.message && <small>{errors.message}</small>}</label>
          <label className="honeypot" aria-hidden="true">Company<input name="company" value={values.company} onChange={update} tabIndex="-1" autoComplete="off" /></label>
          <button className="cyber-action submit-button" disabled={status === 'sending'} type="submit"><span>{status === 'sending' ? 'TRANSMITTING…' : 'SEND TRANSMISSION'}</span><i>→</i></button>
          <div className="form-status" aria-live="polite">
            {status === 'sent' && 'Transmission received. I will respond soon.'}
            {status === 'error' && <>Transmission failed. <a href={`mailto:${profile.email}`}>Send by email instead.</a></>}
            {status === 'cooldown' && 'Please wait one minute before sending another transmission.'}
            {status === 'fallback' && 'Opening your email client…'}
          </div>
        </form>
        <aside className="contact-aside">
          <div className="contact-orbit"><span>KM</span></div>
          <span className="panel-label">DIRECT CHANNELS</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">github.com/Ceyju ↗</a>
          <p>PUBLIC RESPONSE WINDOW<br /><strong>24–72 HOURS</strong></p>
        </aside>
      </div>
    </PageShell>
  );
}
