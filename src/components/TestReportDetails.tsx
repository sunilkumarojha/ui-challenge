import React from 'react';
import '../styles/TestReportDetails.css';

interface Test {
  id: number;
  method: string;
  endpoint: string;
  duration: number;
}

interface Report {
  id: number;
  timestamp: string;
  status: string;
  tests: {
    failed: Test[];
    passed: Test[];
  };
}

interface Organization {
  id: number;
  name: string;
}

interface TestReportDetailsProps {
  organization: Organization;
  report: Report | null;
}

const TestReportDetails: React.FC<TestReportDetailsProps> = ({ organization, report }) => {
  if (!report) return <div>Loading...</div>;

  return (
    <div className="test-report-details">
      <aside>
        <h2>{organization.name}</h2>
        <p>Test Reports</p>
      </aside>
      <div className="report-details">
        <h3>Execution #{report.id} - {report.status}</h3>
        <p>Finished {report.timestamp}</p>
        <input type="text" placeholder="Filter by endpoint..." />
        <div className="test-list">
          <h4>Failed Tests</h4>
          {report.tests.failed.map(test => (
            <div key={test.id} className="test-item failed">
              <p>{test.method} {test.endpoint}</p>
              <p>{test.duration}s</p>
            </div>
          ))}
          <h4>Passed Tests</h4>
          {report.tests.passed.map(test => (
            <div key={test.id} className="test-item passed">
              <p>{test.method} {test.endpoint}</p>
              <p>{test.duration}s</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestReportDetails;
