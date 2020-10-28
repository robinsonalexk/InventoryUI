import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import CreateItemRow from './CreateItemRow.vue'


const localVue = createLocalVue()

localVue.use(BootstrapVue)
localVue.use(IconsPlugin)

describe('CreateItemRow', () => {
    test('init', () => {
        const wrapper = mount(CreateItemRow, {
            localVue
        })
        expect(true).toBe(true);
    })

    test('Check Add Event', () => {
        const wrapper = mount(CreateItemRow, {
            localVue
        })
        wrapper.setData({itemname: "Test Value"})
        wrapper.setData({cost: 20})
        wrapper.find("#confirmButton").trigger("click")

        expect(wrapper.emitted('add-item')).toBeTruthy()
        expect(wrapper.emitted('add-item')[0][0]).toEqual({itemName: "Test Value", cost: 20})
    })
 })