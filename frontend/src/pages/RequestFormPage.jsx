import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const RequestFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    priority: 'medium',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call will be implemented here
      navigate('/requests');
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Новий запит на постачання</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <Input
          label="Назва предмету"
          name="itemName"
          value={formData.itemName}
          onChange={(e) => setFormData({...formData, itemName: e.target.value})}
          required
        />
        
        <Input
          label="Кількість"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({...formData, quantity: e.target.value})}
          required
        />
        
        <div className="mb-4">
          <label className="block mb-2">Пріоритет</label>
          <select
            className="w-full border rounded-md p-2"
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
          >
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
            <option value="critical">Критичний</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Примітки</label>
          <textarea
            className="w-full border rounded-md p-2"
            rows="4"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
        </div>
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/requests')}
          >
            Скасувати
          </Button>
          <Button type="submit">
            Відправити запит
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestFormPage;
