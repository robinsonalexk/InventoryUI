import { mount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import ItemRow from './ItemRow.vue'
import 'regenerator-runtime/runtime'


const localVue = createLocalVue()

localVue.use(BootstrapVue)
localVue.use(IconsPlugin)

describe('ItemRow', () => {
    test('init', () => {
        const wrapper = mount(ItemRow, {
            localVue,
            propsData: {
                item: {
                    id: 1,
                    itemName: 'TEST',
                    cost: 20
                }
            }
        })
        expect(true).toBe(true);
    })

    test('Check Props', () => {
        const wrapper = mount(ItemRow, {
            localVue,
            propsData: {
                item: {
                    id: 1,
                    itemName: 'TEST',
                    cost: 20
                }
            }
        })
        expect(wrapper.props().item).toEqual({id: 1, itemName: 'TEST', cost: 20})
    })

    test('Check Toggle Edit', () => {
        const wrapper = mount(ItemRow, {
            localVue,
            propsData: {
                item: {
                    id: 1,
                    itemName: 'TEST',
                    cost: 20
                }
            }
        })

        wrapper.find("#editButton").trigger("click")
        expect(wrapper.vm.newName).toEqual("TEST");
        expect(wrapper.vm.newCost).toBe(20);
        expect(wrapper.vm.editing).toBe(true);
        expect(wrapper.vm.buttonText).toBe("Cancel")

        wrapper.find("#editButton").trigger("click")
        expect(wrapper.vm.newName).toEqual(null);
        expect(wrapper.vm.newCost).toBe(null);
        expect(wrapper.vm.editing).toBe(false);
        expect(wrapper.vm.buttonText).toBe("Edit")
    })

    test('Check Confirm Changes', async () => {
        const wrapper = mount(ItemRow, {
            localVue,
            propsData: {
                item: {
                    id: 1,
                    itemName: 'TEST',
                    cost: 20
                }
            }
        })

        wrapper.find("#editButton").trigger("click")
        wrapper.setData({newName: "TEST UPDATE"})
        wrapper.setData({newCost: 10})

        await wrapper.vm.$nextTick();
        wrapper.find("#confirmButton").trigger("click")
        expect(wrapper.emitted('edit-item')).toBeTruthy()
        expect(wrapper.emitted('edit-item')[0][0]).toEqual({id: 1, itemName: "TEST UPDATE", cost: 10})
    })

    test('Check Remove Event', () => {
        const wrapper = mount(ItemRow, {
            localVue,
            propsData: {
                item: {
                    id: 1,
                    itemName: 'TEST',
                    cost: 20
                }
            }
        })
        wrapper.find("#removeButton").trigger("click")

        expect(wrapper.emitted('remove-item')).toBeTruthy()
        expect(wrapper.emitted('remove-item')[0][0]).toEqual({id: 1, itemName: 'TEST', cost: 20})
    })
 })