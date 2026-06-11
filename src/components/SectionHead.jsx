import Reveal from './Reveal.jsx'

// Shared section header: marker-style tag, big display title, optional lead.
export default function SectionHead({ tag, title, lead }) {
  return (
    <div className="section-head">
      <Reveal as="p" className="section-tag">
        {tag}
      </Reveal>
      <Reveal as="h2" className="section-title" delay={60}>
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" className="section-lead" delay={120}>
          {lead}
        </Reveal>
      )}
    </div>
  )
}
