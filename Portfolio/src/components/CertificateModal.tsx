import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Certificate } from '../data/certificates'

const RAW_BASE = 'https://raw.githubusercontent.com/Sathvik0728/Certificates-/main'

interface Props {
  cert: Certificate | null
  onClose: () => void
}

export default function CertificateModal({ cert, onClose }: Props) {
  useEffect(() => {
    if (!cert) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [cert, onClose])

  const isImage = cert?.filename.match(/\.(png|jpg|jpeg)$/i)
  const rawUrl = cert ? `${RAW_BASE}/${encodeURIComponent(cert.filename)}` : ''
  const pdfViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(rawUrl)}&embedded=true`

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.stopPropagation()}
            className="relative glass-card w-full max-w-3xl overflow-hidden flex flex-col"
            style={{ maxHeight: '90vh' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-4 border-b border-white/10 shrink-0">
              <div>
                <h2 className="font-heading font-semibold text-white text-sm leading-snug">{cert.title}</h2>
                <p className="text-white/40 text-xs mt-0.5">{cert.issuer}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-white/30 hover:text-white transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden bg-white/[0.02]" style={{ minHeight: '60vh' }}>
              {isImage ? (
                <img
                  src={rawUrl}
                  alt={cert.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={pdfViewerUrl}
                  title={cert.title}
                  className="w-full h-full border-0"
                  style={{ minHeight: '60vh' }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
