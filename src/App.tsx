import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OrganizationPicker from './components/OrganizationPicker';
import TestReportsList from './components/TestReportsList';
import TestReportDetails from './components/TestReportDetails';
import './App.css';

interface Organization {
  id: number;
  name: string;
}

interface Report {
  id: number;
  timestamp: string;
  passed: number;
  failed: number;
  status: string;
  tests: {
    failed: {
      id: number;
      method: string;
      endpoint: string;
      duration: number;
    }[];
    passed: {
      id: number;
      method: string;
      endpoint: string;
      duration: number;
    }[];
  };
}

const App: React.FC = () => {
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const organizations: Organization[] = [
    { id: 1, name: 'Organization A' },
    { id: 2, name: 'Organization B' }
  ];

  const reports: Report[] = [
    {
      id: 1,
      timestamp: '2024-05-19T12:34:56Z',
      passed: 10,
      failed: 2,
      status: 'Completed',
      tests: {
        failed: [
          { id: 1, method: 'GET', endpoint: '/api/test1', duration: 1.2 },
          { id: 2, method: 'POST', endpoint: '/api/test2', duration: 2.5 }
        ],
        passed: [
          { id: 3, method: 'GET', endpoint: '/api/test3', duration: 0.8 },
          { id: 4, method: 'DELETE', endpoint: '/api/test4', duration: 1.1 }
        ]
      }
    }
  ];

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <OrganizationPicker
              organizations={organizations}
              onSelect={setSelectedOrganization}
            />
          </Route>
          <Route path="/reports" exact>
            {selectedOrganization && (
              <TestReportsList
                organization={selectedOrganization}
                reports={reports}
                onSelectReport={setSelectedReport}
              />
            )}
          </Route>
          <Route path="/report-details" exact>
            {selectedOrganization && selectedReport && (
              <TestReportDetails
                organization={selectedOrganization}
                report={selectedReport}
              />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
