import {  createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Buefy from "buefy";
import VeeValidate from "vee-validate";
import moment from "moment";

import AddReminderComponent from "@/components/AddReminder.vue";
import DateModel from "@/models/DateModel";
import ReminderModel from "@/models/ReminderModel";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);
localVue.use(VeeValidate);
localVue.filter("formatDate", (value: Date) => moment(value).format("L"));
describe("AddReminder.vue", () => {
  it("should emit saved event when persisting", async () => {
    const date = new DateModel(new Date());
    const wr = mount(AddReminderComponent, {
      propsData: { date },
      localVue,
    });
    const model = new ReminderModel(new Date(), "Make the dinner", "Kitchen", "#FFFFF");
    model.time = model.date;
    await wr.setData({model});
    const vm = wr.vm as any;
    await vm.save();
    expect(wr.emitted().saved).toBeUndefined();
  });
});
