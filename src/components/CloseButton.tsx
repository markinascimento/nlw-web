// => Import da lib de acessibilidade
import { Popover } from '@headlessui/react'

// => Import da lib de Icons
import { X } from 'phosphor-react'

export function CloseButton() {
  return (
    <Popover.Button className='text-zinc-400 hover:text-zinc-100' title='Fechar formulário de feedback'>
      <X weight='bold' className='w-4 h-4'/>
    </Popover.Button>
  )
}
