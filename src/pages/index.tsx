import React, { useState } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiText,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
  EuiFormRow,
  EuiSelect,
  EuiHorizontalRule,
  EuiBottomBar,
  EuiSwitch,
  EuiFlyout,
  EuiFlyoutBody,
} from '@elastic/eui';

import { NavButton } from '../components/nav_button';
import { Timeline } from '../components/timeline';

import '../themes/theme_light.scss';
import './index.scss';

const tierClassMap = {
  hot: 'tier-container--hot-tier',
  warm: 'tier-container--warm-tier',
  cold: 'tier-container--cold-tier',
};

const titleMap = {
  hot: 'Hot',
  warm: 'Warm',
  cold: 'Cold',
};

const tierIconMap = {
  hot: 'compute',
  warm: 'compute',
  cold: 'compute',
};

const Phase = ({
  phase,
  tier,
}: {
  phase: keyof typeof tierClassMap;
  tier: keyof typeof tierClassMap;
  noBottomConnector?: boolean;
}) => {
  const phaseTitle = titleMap[phase];
  const tierClass = tierClassMap[tier];
  const tierTitle = titleMap[tier];
  const [showSettings, setShowSettings] = useState(false);
  return (
    <div className="outer-container">
      <div className="floating-panels-container">
        <div className={`tier-container ${tierClass}`}>
          <div className="tier-container__content">
            <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween">
              <EuiFlexItem grow={false}>
                <EuiText size="xs">
                  <h3>{tierTitle} tier</h3>
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiButtonEmpty style={{ height: '25px' }} size="s">
                      View Details
                    </EuiButtonEmpty>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        </div>
        <EuiPanel paddingSize="l" className="phase-container" hasShadow={false}>
          <EuiFlexGroup
            direction="row"
            justifyContent="center"
            gutterSize="none"
            alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiSwitch label="" checked={true} onChange={() => {}} />
            </EuiFlexItem>
            <EuiFlexItem grow>
              <EuiTitle size="s">
                <h2>{phaseTitle} phase</h2>
              </EuiTitle>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty size="xs">Advanced Settings</EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="m" />
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
            <EuiFlexItem>
              <EuiButton onClick={() => setShowSettings(v => !v)}>
                Manage phase actions
              </EuiButton>
            </EuiFlexItem>
            {showSettings && (
              <EuiFlyout onClose={() => setShowSettings(false)}>
                <EuiFlyoutBody>
                  <EuiFlexItem>OK</EuiFlexItem>
                </EuiFlyoutBody>
              </EuiFlyout>
            )}
          </EuiFlexGroup>
        </EuiPanel>
      </div>
    </div>
  );
};

export default () => {
  const [showTimeline, setShowTimeline] = useState(false);
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
          <EuiText size="s">
            Ignore{' '}
            <span role="img" aria-label="pointing down to button">
              👇🏻
            </span>{' '}
            button, it is not part of the design
          </EuiText>
          <EuiButton onClick={() => setShowTimeline(v => !v)}>
            Toggle timeline
          </EuiButton>
          <EuiSpacer size="xxl" />
          <EuiTitle size="m">
            <h3>Data retention overview</h3>
          </EuiTitle>
          <EuiSpacer size="m" />
          <Timeline />
          <EuiSpacer size="m" />
          <EuiTitle size="m">
            <h3>Phases</h3>
          </EuiTitle>
          <EuiSpacer size="m" />
          <Phase phase="hot" tier="hot" />
          <EuiSpacer size="m" />
          <Phase phase="warm" tier="warm" />
          <EuiSpacer size="m" />
          <Phase phase="cold" tier="cold" noBottomConnector />
          <EuiSpacer size="xxl" />
          <EuiHorizontalRule />
          <EuiTitle size="m">
            <h2>All hot</h2>
          </EuiTitle>
          <EuiSpacer size="xxl" />
          <Phase phase="hot" tier="hot" />
          <EuiSpacer size="m" />
          <Phase phase="warm" tier="hot" />
          <EuiSpacer size="m" />
          <Phase phase="cold" tier="hot" noBottomConnector />
          <EuiSpacer size="xxl" />
          <EuiHorizontalRule />
          <EuiSpacer size="xxl" />
          <EuiTitle size="m">
            <h2>Hot, hot, warm</h2>
          </EuiTitle>
          <EuiSpacer size="xxl" />
          <Phase phase="hot" tier="hot" />
          <EuiSpacer size="m" />
          <Phase phase="warm" tier="hot" />
          <EuiSpacer size="m" />
          <Phase phase="cold" tier="cold" noBottomConnector />
          <NavButton to="/idea-2">Go to page 2</NavButton>
          <NavButton to="/timing-selection-page">
            Go to timing selection
          </NavButton>
        </EuiPageContent>
      </EuiPageBody>
      {showTimeline && (
        <EuiBottomBar>
          <Timeline />
        </EuiBottomBar>
      )}
    </EuiPage>
  );
};
