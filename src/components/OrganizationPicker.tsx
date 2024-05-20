import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/OrganizationPicker.css';

interface Organization {
  id: number;
  name: string;
}

interface OrganizationPickerProps {
  organizations: Organization[];
  onSelect: (org: Organization) => void;
}

const OrganizationPicker: React.FC<OrganizationPickerProps> = ({ organizations, onSelect }) => {
  const history = useHistory();

  const handleSelect = (org: Organization) => {
    onSelect(org);
    history.push('/reports');
  };

  return (
    <div className="organization-picker">
      <h1>Organizations</h1>
      <p>Pick the organization you want to access</p>
      <div className="organization-list">
        {organizations.map(org => (
          <div key={org.id} className="organization-item" onClick={() => handleSelect(org)}>
            <input type="radio" name="organization" />
            {org.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationPicker;
