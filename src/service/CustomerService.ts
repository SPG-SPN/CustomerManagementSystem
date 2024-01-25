import axios from 'axios';
import { Customer } from '@/model/Customer';

class CustomerService {
  private baseURL: string = 'http://localhost:8080/customers';

  constructor() {
  }

  private getAuthConfig() {
    return { };
  }

  async getAllCustomers(): Promise<Customer[] | undefined> {
    try {
      const response = await axios.get<Customer[]>(`${this.baseURL}/`, this.getAuthConfig());
      return response.data;
    } catch (error) {
      this.handleError(error);
      return undefined;
    }
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    try {
      const response = await axios.get<Customer>(`${this.baseURL}/${id}`, this.getAuthConfig());
      return response.data;
    } catch (error) {
      this.handleError(error);
      return undefined;
    }
  }

  async createCustomer(customer: Customer): Promise<Customer | undefined> {
    try {
      const response = await axios.post<Customer>(`${this.baseURL}/create`, customer, this.getAuthConfig());
      return response.data;
    } catch (error) {
      this.handleError(error);
      return undefined;
    }
  }

  async updateCustomer(id: number, customer: Customer): Promise<Customer | undefined> {
    try {
      const response = await axios.put<Customer>(`${this.baseURL}/${id}`, customer, this.getAuthConfig());
      return response.data;
    } catch (error) {
      this.handleError(error);
      return undefined;
    }
  }

  async deleteCustomer(id: number): Promise<void | undefined> {
    try {
      await axios.delete<void>(`${this.baseURL}/${id}`, this.getAuthConfig());
    } catch (error) {
      this.handleError(error);
      return undefined;
    }
  }

  private handleError(error: any) {
    if (error.response) {
      alert(`Error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      alert('Error: No response received from the server.');
    } else {
      alert('Error: ' + error.message);
    }
  }
}

export default CustomerService;
