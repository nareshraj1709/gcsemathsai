'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Topic {
  slug: string
  title: string
  description: string
  tier: string
}

interface StrandProps {
  strand: string
  icon: string
  colour: string
  bg: string
  topics: Topic[]
  defaultOpen?: boolean
}

function cleanTitle(title: string) {
  return title
    .replace(/\s*[–—‒―-]\s*(GCSE|Revision|Step).*$/, '')
    .replace(/ GCSE.*$/, '')
}

export default function StrandAccordion({ strand, icon, colour, bg, topics, defaultOpen = false }: StrandProps) {
  const [open, setOpen] = useState(defaultOpen)
  const higherCount = topics.filter(t => t.tier === 'Higher only').length
  const foundationCount = topics.length - higherCount

  return (
    <div style={{
      marginBottom: 16,
      border: '1px solid var(--rule)',
      borderRadius: 14,
      overflow: 'hidden',
      background: 'var(--paper)',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '18px 22px',
          background: open ? bg : 'var(--paper)',
          border: 'none',
          borderBottom: open ? '1px solid var(--rule)' : 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <span style={{
          fontSize: 20,
          width: 36,
          height: 36,
          display: 'grid',
          placeItems: 'center',
          borderRadius: 10,
          background: open ? colour : bg,
          color: open ? 'var(--cream)' : colour,
          fontWeight: 700,
          fontFamily: 'var(--serif)',
          flexShrink: 0,
        }}>
          {icon}
        </span>

        <div style={{ flex: 1, textAlign: 'left' }}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--ink)',
            margin: 0,
            lineHeight: 1.3,
          }}>
            {strand}
          </h2>
          <p style={{
            fontSize: 12,
            color: 'var(--ink-3)',
            margin: '2px 0 0',
            fontFamily: 'var(--mono)',
          }}>
            {foundationCount} Foundation &middot; {higherCount} Higher only
          </p>
        </div>

        <span style={{
          fontSize: 11,
          fontFamily: 'var(--mono)',
          fontWeight: 700,
          color: colour,
          background: bg,
          padding: '4px 12px',
          borderRadius: 999,
          flexShrink: 0,
        }}>
          {topics.length}
        </span>

        <span style={{
          fontSize: 18,
          color: 'var(--ink-3)',
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          flexShrink: 0,
        }}>
          {'▾'}
        </span>
      </button>

      {open && (
        <div style={{
          padding: '16px 18px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 10,
        }}>
          {topics.map((topic, idx) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              style={{
                display: 'block',
                background: 'var(--cream)',
                border: '1px solid var(--rule)',
                borderRadius: 10,
                padding: '12px 14px',
                transition: 'all 0.15s',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    lineHeight: 1.4,
                    margin: 0,
                  }}>
                    {idx + 1}. {cleanTitle(topic.title)}
                  </p>
                  <p style={{
                    fontSize: 12,
                    color: 'var(--ink-3)',
                    marginTop: 3,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {topic.description}
                  </p>
                </div>
                {topic.tier === 'Higher only' && (
                  <span style={{
                    flexShrink: 0,
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: 'var(--mono)',
                    color: 'var(--gold)',
                    background: 'var(--gold-soft)',
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}>
                    H
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
