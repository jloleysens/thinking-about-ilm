import React, { FunctionComponent, useState } from 'react';
import {
  EuiButtonEmpty,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiForm,
  EuiFormRow,
  EuiFieldNumber,
  EuiFieldText,
  EuiTabbedContent,
  EuiPanel,
  EuiSwitch,
  EuiText,
  EuiSelect,
  EuiButton,
  EuiFlyout,
  EuiFlyoutBody,
  EuiEmptyPrompt,
  EuiIconTip,
  EuiDescribedFormGroup,
  EuiToggle,
  EuiFlyoutHeader,
} from '@elastic/eui';

import { NavButton } from '../components/nav_button';
import { Timeline } from '../components/timeline';

import '../themes/theme_light.scss';
import './index.scss';

const phaseToIconMap: { [key: string]: string } = {
  hot: 'temperature',
  warm: 'cloudSunny',
  cold: 'cloudDrizzle',
};

const Timing: FunctionComponent<{ phase: string; phaseName: string }> = ({
  phase,
  phaseName,
}) => {
  const [enabled, setEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const phaseIcon = phaseToIconMap[phase];
  const isHotPhase = phase === 'hot';
  return (
    <>
      <EuiPanel>
        <EuiFlexGroup
          direction="row"
          justifyContent="center"
          gutterSize="none"
          alignItems="center">
          {!isHotPhase && (
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label=""
                checked={enabled}
                onChange={() => setEnabled(v => !v)}
              />
            </EuiFlexItem>
          )}
          <EuiFlexItem grow>
            <EuiTitle size="s">
              <h3>
                {phaseName} data
                {isHotPhase && (
                  <>
                    {' '}
                    <EuiIconTip
                      type="questionInCircle"
                      content="An explanation about why hot is always on"
                    />
                  </>
                )}
              </h3>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty
              isDisabled={!enabled}
              onClick={() => setShowSettings(v => !v)}
              size="xs">
              Manage Settings
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        {enabled ? (
          <EuiFlexGroup
            gutterSize="s"
            alignItems="flexStart"
            direction="column">
            <EuiFlexItem>
              <EuiFormRow>
                <EuiFlexGroup gutterSize="s" alignItems="center">
                  <EuiFlexItem grow={false}>
                    <EuiText size="m">Keep data in this phase for</EuiText>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiSelect
                      compressed
                      options={[
                        { value: 1, text: '1' },
                        { value: 2, text: '2' },
                        { value: 4, text: '4' },
                        { value: 8, text: '8' },
                        { value: 16, text: '16' },
                        { value: 32, text: '32' },
                      ]}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiText size="m">days.</EuiText>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        ) : (
          <EuiEmptyPrompt
            titleSize="s"
            iconType={phaseIcon}
            title={<h4>{phaseName} data</h4>}
            actions={
              <EuiButton onClick={() => setEnabled(true)} color="primary" fill>
                Activate {phase} data
              </EuiButton>
            }
          />
        )}
      </EuiPanel>
      {showSettings && (
        <EuiFlyout onClose={() => setShowSettings(false)}>
          <EuiFlyoutHeader>
            <EuiTitle>
              <h2>Manage Settings</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiFlexGroup direction="column">
              <EuiFlexItem grow={false}>Some settings in here...</EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty
                  style={{
                    width: '200px',
                  }}
                  flush="left"
                  iconType="arrowDown"
                  onClick={() => {}}>
                  Advanced Settings
                </EuiButtonEmpty>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};

export default () => {
  const tabs = [
    {
      id: 'phases',
      name: 'Phases',
      content: (
        <>
          <EuiSpacer size="l" />
          <EuiTitle size="s">
            <h3>Phases</h3>
          </EuiTitle>
          <EuiSpacer size="l" />
          <EuiText>
            <p>
              Use data phases to optimise the trade-offs between cost and
              performance.
            </p>
          </EuiText>
          <EuiSpacer size="l" />
          <Timing phase="hot" phaseName="Hot" />
          <EuiSpacer size="l" />
          <Timing phase="warm" phaseName="Warm" />
          <EuiSpacer size="l" />
          <Timing phase="cold" phaseName="Cold" />
        </>
      ),
    },
    {
      id: 'backup',
      name: 'Backup and snapshots',
      content: (
        <>
          <EuiSpacer size="l" />
          <EuiTitle size="s">
            <h3>Backup and snapshots</h3>
          </EuiTitle>
          <EuiSpacer size="l" />
          <EuiDescribedFormGroup
            title={<h3>Wait for snapshot before delete</h3>}
            description="Enforce waiting that a snapshot has finished before deleting data.">
            <EuiFormRow>
              <EuiSwitch
                onChange={() => {}}
                label="Wait for snapshot before delete"
                checked={false}
              />
            </EuiFormRow>
          </EuiDescribedFormGroup>
        </>
      ),
    },
    {
      id: 'rollup',
      name: 'Rollup',
      content: 'nothing to see here, yet!',
    },
  ];
  return (
    <EuiPage restrictWidth>
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Data Tiers, ILM &amp; Data Retention</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiTitle size="l">
            <h2>Edit policy</h2>
          </EuiTitle>
          <EuiSpacer size="m" />
          <EuiFormRow label="Policy name">
            <EuiFieldText onChange={() => {}} value="My policy" />
          </EuiFormRow>
          <EuiSpacer size="l" />
          <EuiTitle size="s">
            <h3>Policy overview</h3>
          </EuiTitle>
          <EuiSpacer size="m" />
          <EuiFlexGroup
            gutterSize="s"
            alignItems="flexStart"
            direction="column">
            <EuiFlexItem>
              <EuiFormRow>
                <EuiFlexGroup gutterSize="s" alignItems="center">
                  <EuiFlexItem grow={false}>
                    <EuiText size="m">Keep data for</EuiText>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiSelect
                      compressed
                      options={[
                        { value: 1, text: '1' },
                        { value: 2, text: '2' },
                        { value: 4, text: '4' },
                        { value: 8, text: '8' },
                        { value: 16, text: '16' },
                        { value: 32, text: '32' },
                        { value: Infinity, text: 'Infinity' },
                      ]}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiText size="m">days.</EuiText>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="m" />
          <Timeline />
          <EuiSpacer size="l" />
          <EuiTabbedContent
            tabs={tabs}
            initialSelectedTab={tabs[0]}
            autoFocus="initial"
          />
          <EuiSpacer size="xxl" />
          <NavButton to="/">Back to home</NavButton>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
