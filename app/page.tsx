'use client';

import { FormEvent, useMemo, useState } from 'react';

type AdmissionForm = {
  studentName: string;
  requestedClass: string;
  guardianName: string;
  guardianContact: string;
  guardianEmail: string;
  consent: boolean;
};

const initialForm: AdmissionForm = {
  studentName: '',
  requestedClass: '',
  guardianName: '',
  guardianContact: '',
  guardianEmail: '',
  consent: false
};

const academicCards = [
  {
    title: 'Primary Learning',
    text: 'A strong foundation in reading, writing, mathematics, and classroom confidence.'
  },
  {
    title: 'Middle Classes',
    text: 'Subject-focused learning with discipline, curiosity, and regular progress checks.'
  },
  {
    title: 'Admissions Support',
    text: 'A simple frontend admission form is included here. Secure submission will be added later.'
  }
];

export default function Home() {
  const [form, setForm] = useState<AdmissionForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AdmissionForm, string>>>({});

  const previewRows = useMemo(
    () => [
      ['Student name', form.studentName],
      ['Requested class', form.requestedClass],
      ['Guardian name', form.guardianName],
      ['Guardian contact', form.guardianContact],
      ['Guardian email', form.guardianEmail || 'Not provided']
    ],
    [form]
  );

  function updateField<Key extends keyof AdmissionForm>(field: Key, value: AdmissionForm[Key]) {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  }

  function validate() {
    const nextErrors: Partial<Record<keyof AdmissionForm, string>> = {};

    if (!form.studentName.trim()) nextErrors.studentName = 'Student name is required.';
    if (!form.requestedClass.trim()) nextErrors.requestedClass = 'Requested class is required.';
    if (!form.guardianName.trim()) nextErrors.guardianName = 'Guardian name is required.';
    if (!form.guardianContact.trim()) nextErrors.guardianContact = 'Guardian contact is required.';
    if (form.guardianEmail && !/^\S+@\S+\.\S+$/.test(form.guardianEmail)) {
      nextErrors.guardianEmail = 'Enter a valid email address or leave it empty.';
    }
    if (!form.consent) nextErrors.consent = 'Please confirm this is preview data only.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Delta School Turbat home">
          <span className="brand-mark">Δ</span>
          <span>
            <strong>Delta School</strong>
            <small>Turbat</small>
          </span>
        </a>
        <nav className="nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#academics">Academics</a>
          <a href="#admissions">Admissions</a>
          <a href="#admin">Admin Preview</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="home" className="hero section-shell">
        <div className="hero-content">
          <p className="eyebrow">Frontend website preview</p>
          <h1>Delta School Turbat</h1>
          <p className="hero-lead">Learn. Grow. Achieve.</p>
          <p className="hero-copy">
            A clean school website frontend with admission form UI, academic sections, and a future admin area preview.
            Backend, login, and student data storage are not connected yet.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#admissions">Apply for Admission</a>
            <a className="button secondary" href="#academics">Explore Academics</a>
          </div>
        </div>
        <div className="hero-card" aria-label="Website status">
          <span className="status-dot" />
          <h2>Website frontend is ready</h2>
          <p>Use this first version for public pages and design review. Do not enter real student records yet.</p>
        </div>
      </section>

      <section id="about" className="section-shell split-section">
        <div>
          <p className="eyebrow">About</p>
          <h2>Welcome to Delta School Turbat</h2>
        </div>
        <div className="content-card">
          <p>
            This section is ready for official school introduction, mission, vision, and verified school information.
            Add only approved details such as official address, phone number, class levels, and admission policy.
          </p>
          <p>
            Current content is draft frontend copy. It should be updated before the public launch.
          </p>
        </div>
      </section>

      <section id="academics" className="section-shell">
        <p className="eyebrow">Academics</p>
        <h2>Learning areas</h2>
        <div className="card-grid">
          {academicCards.map((card) => (
            <article className="content-card academic-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="admissions" className="section-shell admissions-section">
        <div className="section-heading">
          <p className="eyebrow">Admissions</p>
          <h2>Student registration form</h2>
          <p>This is a frontend-only form. It previews the application but does not submit or store data.</p>
        </div>

        <form className="admission-form" onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              Student name
              <input
                value={form.studentName}
                onChange={(event) => updateField('studentName', event.target.value)}
                aria-invalid={Boolean(errors.studentName)}
                placeholder="Enter student name"
              />
              {errors.studentName && <span className="error">{errors.studentName}</span>}
            </label>

            <label>
              Requested class
              <input
                value={form.requestedClass}
                onChange={(event) => updateField('requestedClass', event.target.value)}
                aria-invalid={Boolean(errors.requestedClass)}
                placeholder="Example: Class 5"
              />
              {errors.requestedClass && <span className="error">{errors.requestedClass}</span>}
            </label>

            <label>
              Guardian name
              <input
                value={form.guardianName}
                onChange={(event) => updateField('guardianName', event.target.value)}
                aria-invalid={Boolean(errors.guardianName)}
                placeholder="Enter guardian name"
              />
              {errors.guardianName && <span className="error">{errors.guardianName}</span>}
            </label>

            <label>
              Guardian contact
              <input
                value={form.guardianContact}
                onChange={(event) => updateField('guardianContact', event.target.value)}
                aria-invalid={Boolean(errors.guardianContact)}
                placeholder="Enter phone number"
              />
              {errors.guardianContact && <span className="error">{errors.guardianContact}</span>}
            </label>

            <label className="full-width">
              Guardian email optional
              <input
                value={form.guardianEmail}
                onChange={(event) => updateField('guardianEmail', event.target.value)}
                aria-invalid={Boolean(errors.guardianEmail)}
                placeholder="guardian@example.com"
              />
              {errors.guardianEmail && <span className="error">{errors.guardianEmail}</span>}
            </label>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => updateField('consent', event.target.checked)}
            />
            <span>I understand this preview does not save or submit real student information.</span>
          </label>
          {errors.consent && <span className="error block-error">{errors.consent}</span>}

          <button className="button primary" type="submit">Preview application</button>
        </form>

        {submitted && (
          <aside className="preview-box" aria-live="polite">
            <h3>Application preview</h3>
            <p className="warning">Demo only — application has not been submitted or stored.</p>
            <dl>
              {previewRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </section>

      <section id="admin" className="section-shell admin-section">
        <div>
          <p className="eyebrow">Admin Preview</p>
          <h2>Future school management area</h2>
          <p>
            This is only a UI preview. Real staff login, database security, admissions approval, attendance,
            fees, and results will be added in the backend phase.
          </p>
        </div>
        <div className="admin-grid">
          <article className="content-card">
            <h3>Admissions</h3>
            <p>No applications connected yet.</p>
          </article>
          <article className="content-card">
            <h3>Attendance</h3>
            <p>Planned module.</p>
          </article>
          <article className="content-card">
            <h3>Fees</h3>
            <p>Planned module.</p>
          </article>
          <article className="content-card">
            <h3>Results</h3>
            <p>Planned module.</p>
          </article>
        </div>
      </section>

      <section id="contact" className="section-shell contact-section">
        <p className="eyebrow">Contact</p>
        <h2>Contact details to be added</h2>
        <p>
          Add the official school address, phone number, email, and office timings before launch.
          No unverified contact details are published in this frontend.
        </p>
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Delta School Turbat. Frontend preview only.</p>
        <p>Live registration and staff login are not connected.</p>
      </footer>
    </main>
  );
}
