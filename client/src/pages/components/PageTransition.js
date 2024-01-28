import { Transition } from "@headlessui/react"

export const LbPageTransition = ({ children }) => {
  return (
    <Transition
      appear={true}
      show={true}
      enter="transform lb-transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transform lb-transition ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 "
    >
      {children}
    </Transition>
  )
}
