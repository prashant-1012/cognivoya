import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { X, PlusCircle, Globe, Tag, Layers, DollarSign, AlignLeft, Type } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppDispatch } from '@/app/hooks'
import { submitTool } from './submissionsSlice'
import { CATEGORIES } from '@/utils/constants'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const PRICING_OPTIONS = [
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Paid' },
]

// exclude 'all' from the category select
const TOOL_CATEGORIES = CATEGORIES.filter((c) => c.slug !== 'all')

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name is too long'),
  website: z
    .string()
    .url('Enter a valid URL (include https://)')
    .min(1, 'Website is required'),
  tagline: z
    .string()
    .min(10, 'Tagline must be at least 10 characters')
    .max(80, 'Tagline must be under 80 characters'),
  category: z.string().min(1, 'Pick a category'),
  pricing: z.enum(['free', 'freemium', 'paid'], { message: 'Select a pricing model' }),
  description: z.string().max(300, 'Description must be under 300 characters').optional(),
  tags: z.string().max(100, 'Tags string is too long').optional(),
})

const Field = ({ label, icon: Icon, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center gap-1.5 text-xs font-medium text-muted uppercase tracking-wide">
      {Icon && <Icon size={12} />}
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
)

const inputCls = (hasError) =>
  cn(
    'w-full px-3 py-2.5 rounded-xl bg-surface-overlay border text-sm text-foreground placeholder:text-subtle',
    'focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all',
    hasError ? 'border-red-400' : 'border-border'
  )

const SubmitToolModal = ({ open, onClose }) => {
  const dispatch = useAppDispatch()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  // close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleClose = () => {
    reset()
    setSubmitted(false)
    onClose()
  }

  const onSubmit = (data) => {
    // derive logo domain from website URL
    const domain = new URL(data.website).hostname.replace('www.', '')
    const tags = data.tags
      ? data.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean).slice(0, 4)
      : []

    dispatch(submitTool({ ...data, logo: domain, tags }))
    setSubmitted(true)
    toast.success('Tool submitted! Find it in your Submissions tab.')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl pointer-events-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-primary/15 flex items-center justify-center">
                    <PlusCircle size={14} className="text-brand-primary" />
                  </div>
                  <h2 className="text-base font-bold text-foreground">Submit a Tool</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-xl text-muted hover:text-foreground hover:bg-surface-overlay transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 px-6 py-5">
                {submitted ? (
                  <SuccessState onClose={handleClose} />
                ) : (
                  <form id="submit-tool-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    {/* Name + Website */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Tool Name" icon={Type} error={errors.name?.message}>
                        <input
                          {...register('name')}
                          placeholder="e.g. Perplexity AI"
                          className={inputCls(errors.name)}
                        />
                      </Field>
                      <Field label="Website URL" icon={Globe} error={errors.website?.message}>
                        <input
                          {...register('website')}
                          placeholder="https://perplexity.ai"
                          className={inputCls(errors.website)}
                        />
                      </Field>
                    </div>

                    {/* Tagline */}
                    <Field label="Tagline" icon={Type} error={errors.tagline?.message}>
                      <input
                        {...register('tagline')}
                        placeholder="One-liner that describes the tool (max 80 chars)"
                        className={inputCls(errors.tagline)}
                      />
                    </Field>

                    {/* Category + Pricing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Category" icon={Layers} error={errors.category?.message}>
                        <select {...register('category')} className={inputCls(errors.category)}>
                          <option value="">Select category…</option>
                          {TOOL_CATEGORIES.map((c) => (
                            <option key={c.slug} value={c.slug}>{c.label}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Pricing" icon={DollarSign} error={errors.pricing?.message}>
                        <select {...register('pricing')} className={inputCls(errors.pricing)}>
                          <option value="">Select pricing…</option>
                          {PRICING_OPTIONS.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* Description */}
                    <Field label="Description (optional)" icon={AlignLeft} error={errors.description?.message}>
                      <textarea
                        {...register('description')}
                        rows={3}
                        placeholder="Brief description of what the tool does (max 300 chars)"
                        className={cn(inputCls(errors.description), 'resize-none')}
                      />
                    </Field>

                    {/* Tags */}
                    <Field label="Tags (optional)" icon={Tag} error={errors.tags?.message}>
                      <input
                        {...register('tags')}
                        placeholder="writing, coding, research  (comma-separated, max 4)"
                        className={inputCls(errors.tags)}
                      />
                    </Field>
                  </form>
                )}
              </div>

              {/* Footer */}
              {!submitted && (
                <div className="px-6 py-4 border-t border-border shrink-0 flex items-center justify-between gap-3">
                  <p className="text-xs text-subtle">Saved locally to your browser</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleClose}>Cancel</Button>
                    <Button
                      type="submit"
                      form="submit-tool-form"
                      size="sm"
                      loading={isSubmitting}
                      icon={<PlusCircle size={13} />}
                    >
                      Submit Tool
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const SuccessState = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-10 gap-4 text-center"
  >
    <div className="w-16 h-16 rounded-2xl bg-brand-primary/15 flex items-center justify-center">
      <PlusCircle size={28} className="text-brand-primary" />
    </div>
    <div>
      <p className="text-base font-bold text-foreground">Tool Submitted!</p>
      <p className="text-sm text-muted mt-1 max-w-xs">
        Your tool has been saved. Find it in the <strong>Submissions</strong> tab on your Bookmarks page.
      </p>
    </div>
    <Button size="sm" onClick={onClose}>Done</Button>
  </motion.div>
)

export default SubmitToolModal
