<template>

    <CustomerFormDialog
            :showDialog="showForm"
            :customerForm="customerForm"
            :editing="editingCustomer !== null"
            @update:showDialog="showForm = $event"
            @saveCustomer="handleSaveCustomer"
    />

    <div class="px-7">
      <v-data-table :headers="headers" :items="customers" class="elevation-1 mt-5">
        <template v-slot:item.projectsDropdown="{ item }">
          <v-select
            :items="item.projects"
            item-text="title"
            item-value="id"
            label="Projects"
            dense
          ></v-select>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn small color="primary" class="" @click="openEditForm(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn small color="error" class="mx-2" @click="deleteCustomer(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <v-btn class="mt-5" color="primary" @click="openCreateForm">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>

    <v-dialog v-model="showConfirmDialog" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this customer?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="showConfirmDialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="confirmDeletion">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import CustomerService from '@/service/CustomerService';
import { Customer } from '@/model/Customer';
import CustomerFormDialog from "@/components/CustomerFormDialog.vue";

const showConfirmDialog = ref(false);
const customerIdToDelete = ref<number | null>(null);

const customerService = new CustomerService();
const customers = ref<Customer[]>([]);
const editingCustomer = ref<Customer | null>(null);
const customerForm = reactive(new Customer(0, '', '', '', '', []));
const showForm = ref(false);
const headers = ref([
    { title: 'First Name', value: 'firstName' },
    { title: 'Last Name', value: 'lastName' },
    { title: 'Phone Number', value: 'phoneNumber' },
    { title: 'Email', value: 'email' },
    { title: 'Projects', value: 'projectsDropdown' },
    { title: 'Actions', value: 'actions', sortable: false }
]);


const fetchCustomers = async () => {
    try {
        const response = await customerService.getAllCustomers();
        customers.value = response;
    } catch (error) {
        console.error(error);
    }
};

const openCreateForm = () => {
    editingCustomer.value = null;
    customerForm.id = 0;
    customerForm.firstName = '';
    customerForm.lastName = '';
    customerForm.phoneNumber = '';
    customerForm.email = '';
    showForm.value = true;
};

const openEditForm = (customer: Customer) => {
    editingCustomer.value = customer;
    customerForm.id = customer.id;
    customerForm.firstName = customer.firstName;
    customerForm.lastName = customer.lastName;
    customerForm.phoneNumber = customer.phoneNumber;
    customerForm.email = customer.email;
    showForm.value = true;
};

const handleSaveCustomer = async (form: any) => {
    if (editingCustomer.value) {
        await customerService.updateCustomer(form.id, form);
    } else {
        await customerService.createCustomer(form);
    }
    showForm.value = false;
    fetchCustomers();
};

const deleteCustomer = (customerId: number) => {
  customerIdToDelete.value = customerId;
  showConfirmDialog.value = true;
};

const confirmDeletion = async () => {
  if (customerIdToDelete.value !== null) {
    customerService.deleteCustomer(customerIdToDelete.value)
        .then(() => {
          fetchCustomers();
          showConfirmDialog.value = false;
        })
        .catch(error => console.error(error));
  }
};

onMounted(fetchCustomers);
</script>
