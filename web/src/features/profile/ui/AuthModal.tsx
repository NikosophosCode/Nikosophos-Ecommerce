import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)

  const handleSuccess = () => {
    onClose()
    setMode('login') // Reset to login for next time
  }

  const handleClose = () => {
    onClose()
    // Reset after animation completes
    setTimeout(() => setMode('login'), 200)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl glass p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-bold leading-6 text-white mb-6 text-center"
                >
                  {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
                </DialogTitle>

                {mode === 'login' ? (
                  <LoginForm
                    onSuccess={handleSuccess}
                    onSwitchToRegister={() => setMode('register')}
                  />
                ) : (
                  <RegisterForm
                    onSuccess={handleSuccess}
                    onSwitchToLogin={() => setMode('login')}
                  />
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
