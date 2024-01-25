<template>
  <v-dialog :model-value="showDialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ editing ? 'Edit' : 'Create' }} Customer</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                  v-model="customerForm.firstName"
                  label="First Name"
                  :error-messages="firstNameErrors"
                  required>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                  v-model="customerForm.lastName"
                  label="Last Name"
                  :error-messages="lastNameErrors"
                  required>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="customerForm.phoneNumber"
                  label="Phone Number"
                  :error-messages="phoneNumberErrors"
                  required>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="customerForm.email"
                  label="Email"
                  :error-messages="emailErrors"
                  required>
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  showDialog: Boolean,
  customerForm: Object,
  editing: Boolean
});

const emit = defineEmits(['update:showDialog', 'saveCustomer']);

const firstNameErrors = computed(() => {
  if (!props.customerForm.firstName) {
    return ['First Name is required'];
  }
  return [];
});

const lastNameErrors = computed(() => {
  if (!props.customerForm.lastName) {
    return ['Last Name is required'];
  }
  return [];
});

const phoneNumberErrors = computed(() => {
  if (!props.customerForm.phoneNumber) {
    return ['Phone Number is required'];
  }
  const phoneRegex = /^[^a-zA-Z]*$/;
  if (!phoneRegex.test(props.customerForm.phoneNumber)) {
    return ['Phone Number must be valid'];
  }
  return [];
});

const emailErrors = computed(() => {
  if (!props.customerForm.email) {
    return ['Email is required'];
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(props.customerForm.email)) {
    return ['Invalid email format'];
  }
  return [];
});

const close = () => {
  emit('update:showDialog', false);
};

const save = () => {
  if (isFormValid()) {
    emit('saveCustomer', props.customerForm);
  }
};

const isFormValid = () => {
  return (
      !firstNameErrors.value.length &&
      !lastNameErrors.value.length &&
      !phoneNumberErrors.value.length &&
      !emailErrors.value.length
  );
};
</script>
