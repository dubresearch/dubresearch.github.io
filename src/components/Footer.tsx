export function Footer() {
  return (
    <footer className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
      <section className="md:justify-self-end">
        <h3 className="mb-4 text-base font-semibold text-foreground">About Us</h3>
        <p className="text-sm font-thin text-foreground">
          We are a small independent company. We aim to provide you with quality,
          affordable, interesting audio devices. So we can pay our rent.
        </p>
      </section>

      <section>
        <h3 className="mb-4 text-base font-semibold text-foreground">Contact</h3>
        <div className="space-y-1 text-sm font-thin text-foreground">
          <p>Email: researchdub[at]gmail.com</p>
          <p>Location: Bristol, UK</p>
        </div>
      </section>
    </footer>
  );
}
