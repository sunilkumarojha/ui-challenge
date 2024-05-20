import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/TestReportsList.css';

interface Report {
  id: number;
  timestamp: string;
  passed: number;
  failed: number;
}

interface Organization {
  id: number;
  name: string;
}

interface TestReportsListProps {
  organization: Organization;
  reports: Report[];
  onSelectReport: (report: Report) => void;
}

const TestReportsList: React.FC<TestReportsListProps> = ({ organization, reports, onSelectReport }) => {
  const history = useHistory();

  const handleSelectReport = (report: Report) => {
    onSelectReport(report);
    history.push('/report-details');
  };

  return (
    <div className="test-reports">
      <aside>
        <h2>{organization.name}</h2>
        <p>Test Reports</p>
      </aside>
      <div className="report-list">
        {reports.map(report => (
          <div key={report.id} className="report-item" onClick={() => handleSelectReport(report)}>
            <h3>Execution #{report.id}</h3>
            <p>{report.timestamp}</p>
            <p>{report.passed} passed, {report.failed} failed</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestReportsList;
