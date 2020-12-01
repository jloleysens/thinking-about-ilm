import React, { useState } from 'react';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiText,
  EuiSwitch,
  EuiSpacer,
  EuiFieldNumber,
  EuiFormRow,
  EuiFieldText,
} from '@elastic/eui';
import { Link } from 'gatsby';

import './index.scss';

const PhaseContainer = ({
  accentColor,
  children,
  enabled,
}: {
  accentColor: string;
  children: any;
  enabled: boolean;
}) => {
  return (
    <EuiFlexGroup
      style={{
        marginTop: '20px',
        marginBottom: '20px',
      }}
      gutterSize="none">
      <EuiFlexItem grow={false}>
        <div
          style={{
            width: '5px',
            height: '100%',
            marginRight: '10px',
            backgroundColor: enabled ? accentColor : '#D3DAE6',
          }}
        />
      </EuiFlexItem>
      <EuiFlexItem
        style={{
          paddingTop: '10px',
          paddingBottom: '10px',
        }}>
        {children}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

const AfterAtLeast = () => {
  const [warmEnabled, setWarmEnabled] = useState(false);
  const [coldEnabled, setColdEnabled] = useState(false);
  const [deleteEnabled, setDeleteEnabled] = useState(false);
  return (
    <>
      <PhaseContainer enabled={true} accentColor="#FF7E62">
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={1}>
            <EuiTitle>
              <h3>Hot phase</h3>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={2}>
            {!(warmEnabled || coldEnabled || deleteEnabled) && (
              <EuiText>
                <p>
                  <em>Forever</em>
                </p>
              </EuiText>
            )}
            {/* <EuiText>
              <p>
                {!(warmEnabled || coldEnabled || deleteEnabled) ? (
                  <em>Time in phase: Forever</em>
                ) : warmEnabled ? (
                  <em>Time in phase: at least 7 days</em>
                ) : coldEnabled ? (
                  <em>Time in phase: at least 14 days</em>
                ) : (
                  <em>Time in phase: at least 35 days</em>
                )}
              </p>
            </EuiText> */}
          </EuiFlexItem>
        </EuiFlexGroup>
        <div style={{ height: '40px' }} />
      </PhaseContainer>
      <PhaseContainer enabled={warmEnabled} accentColor="#F1D86F">
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={1}>
            <EuiTitle>
              <h3>Warm phase</h3>
            </EuiTitle>
            <EuiSpacer />
            <EuiSwitch
              label="Enable"
              checked={warmEnabled}
              onChange={e => setWarmEnabled(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={2}>
            {warmEnabled && (
              <>
                <EuiFormRow
                  fullWidth={false}
                  label="Move to this phase after at least">
                  <EuiFieldNumber value={7} onChange={() => {}} append="days" />
                </EuiFormRow>
                {/* <EuiSpacer size="s" />
                <p>
                  {coldEnabled ? (
                    <em>Time in phase: at least 7 days</em>
                  ) : deleteEnabled ? (
                    <em>Time in phase: at least 28 days</em>
                  ) : (
                    <em>Time in phase: forever</em>
                  )}
                </p> */}
              </>
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
      </PhaseContainer>
      <PhaseContainer
        enabled={coldEnabled}
        accentColor="#79AAD9

">
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={1}>
            <EuiTitle>
              <h3>Cold phase</h3>
            </EuiTitle>
            <EuiSpacer />
            <EuiSwitch
              label="Enable"
              checked={coldEnabled}
              onChange={e => setColdEnabled(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={2}>
            {coldEnabled && (
              <>
                <EuiFormRow
                  fullWidth={false}
                  label="Move to this phase after at least">
                  <EuiFieldNumber
                    value={14}
                    onChange={() => {}}
                    append="days"
                  />
                </EuiFormRow>
                {/* <EuiSpacer size="s" />
                <p>
                  {deleteEnabled ? (
                    <em>Time in phase: at least 21 days</em>
                  ) : (
                    <em>Time in phase: forever</em>
                  )}
                </p> */}
              </>
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
      </PhaseContainer>
      <PhaseContainer enabled={deleteEnabled} accentColor="#343741">
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={1}>
            <EuiTitle>
              <h3>Delete phase</h3>
            </EuiTitle>
            <EuiSpacer />
            <EuiSwitch
              label="Enable"
              checked={deleteEnabled}
              onChange={e => setDeleteEnabled(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={2}>
            {deleteEnabled && (
              <EuiFormRow
                fullWidth={false}
                label="Move to this phase after at least">
                <EuiFieldNumber value={35} onChange={() => {}} append="days" />
              </EuiFormRow>
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
      </PhaseContainer>
    </>
  );
};

const KeepDataForAtLeast = () => {
  const [warmEnabled, setWarmEnabled] = useState(false);
  const [coldEnabled, setColdEnabled] = useState(false);
  const [deleteEnabled, setDeleteEnabled] = useState(false);

  const renderInputOrText = (inputOrText: boolean) =>
    inputOrText ? (
      <EuiFieldNumber value={7} onChange={() => {}} append="days" />
    ) : (
      <EuiFieldText
        disabled
        value="Forever"
        onChange={() => {}}
        append="days"
      />
    );
  return (
    <>
      <PhaseContainer enabled={true} accentColor="#FF7E62">
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={1}>
            <EuiTitle>
              <h3>Hot phase</h3>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={2}>
            <EuiFormRow fullWidth={false} label="Keep data for at least">
              {renderInputOrText(warmEnabled || coldEnabled || deleteEnabled)}
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </PhaseContainer>
      <PhaseContainer enabled={warmEnabled} accentColor="#F1D86F">
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={1}>
            <EuiTitle>
              <h3>Warm phase</h3>
            </EuiTitle>
            <EuiSpacer />
            <EuiSwitch
              label="Enable"
              checked={warmEnabled}
              onChange={e => setWarmEnabled(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={2}>
            {warmEnabled && (
              <EuiFormRow fullWidth={false} label="Keep data for at least">
                {renderInputOrText(coldEnabled || deleteEnabled)}
              </EuiFormRow>
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
      </PhaseContainer>
      <PhaseContainer
        enabled={coldEnabled}
        accentColor="#79AAD9

">
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={1}>
            <EuiTitle>
              <h3>Cold phase</h3>
            </EuiTitle>
            <EuiSpacer />
            <EuiSwitch
              label="Enable"
              checked={coldEnabled}
              onChange={e => setColdEnabled(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={2}>
            {coldEnabled && (
              <EuiFormRow fullWidth={false} label="Keep data for at least">
                {renderInputOrText(deleteEnabled)}
              </EuiFormRow>
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
      </PhaseContainer>
      <PhaseContainer enabled={deleteEnabled} accentColor="#343741">
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={1}>
            <EuiTitle>
              <h3>Delete phase</h3>
            </EuiTitle>
            <EuiSpacer />
            <EuiSwitch
              label="Enable"
              checked={deleteEnabled}
              onChange={e => setDeleteEnabled(e.target.checked)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={2}>
            <div style={{ height: '40px' }} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </PhaseContainer>
    </>
  );
};

export default () => {
  return (
    <EuiPage restrictWidth>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Data retention timing selection</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentBody>
            <EuiTitle>
              <h2>&quot;After at least&quot;</h2>
            </EuiTitle>
            <AfterAtLeast />
            <EuiSpacer />
            <EuiSpacer />
            <EuiSpacer />
            <EuiSpacer />
            <EuiSpacer />
            <EuiTitle>
              <h2>&quot;Keep data for at least&quot;</h2>
            </EuiTitle>
            <KeepDataForAtLeast />
            <Link to="/">Go to Home</Link>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
