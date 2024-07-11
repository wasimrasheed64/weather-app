import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Modal from '@/components/Modal.vue'


describe('ModalComponent', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Modal, {
      props: {
        isOpen: false,
      },
    })
  })

  afterEach(() => {
    document.body.classList.remove('overflow-hidden')
  })

  it('renders correctly when isOpen is false', () => {
    expect(wrapper.find('.modal-inner').exists()).toBe(false)
    expect(document.body.classList.contains('overflow-hidden')).toBe(false)
  })

  it('renders correctly when isOpen is true', async () => {
    await wrapper.setProps({ isOpen: true })
    expect(wrapper.find('.modal-inner').exists()).toBe(true)
    expect(document.body.classList.contains('overflow-hidden')).toBe(true)
  })

  it('emits close event when close button is clicked', async () => {
    await wrapper.setProps({ isOpen: true })
    setTimeout(() => {
      console.log(wrapper.html())
    }, 1000);
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('adds and removes body overflow class based on isOpen prop', async () => {
    await wrapper.setProps({ isOpen: true })
    expect(document.body.classList.contains('overflow-hidden')).toBe(true)

    await wrapper.setProps({ isOpen: false })
    expect(document.body.classList.contains('overflow-hidden')).toBe(false)
  })
})
