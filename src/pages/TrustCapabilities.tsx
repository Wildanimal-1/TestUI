import { useState } from 'react';
import { CheckCircle, XCircle, Lock, TrendingUp } from 'lucide-react';

export default function TrustCapabilities() {
  const capabilities = [
    {
      id: 'cap1',
      name: 'API Access',
      category: 'Core',
      enabled: true,
      required: 70,
      current: 94,
      description: 'Full REST and GraphQL API access with rate limits',
      features: ['REST API', 'GraphQL API', 'Webhooks', 'Real-time events'],
    },
    {
      id: 'cap2',
      name: 'Batch Operations',
      category: 'Core',
      enabled: true,
      required: 75,
      current: 94,
      description: 'Process up to 1000 operations per batch request',
      features: ['Bulk verification', 'Batch imports', 'Parallel processing'],
    },
    {
      id: 'cap3',
      name: 'Webhooks',
      category: 'Integration',
      enabled: true,
      required: 80,
      current: 94,
      description: 'Real-time event notifications to your endpoints',
      features: ['Event subscriptions', 'Custom payloads', 'Retry logic', 'Signature verification'],
    },
    {
      id: 'cap4',
      name: 'Advanced Analytics',
      category: 'Analytics',
      enabled: false,
      required: 95,
      current: 94,
      description: 'Deep insights into trust metrics and trends',
      features: ['Custom dashboards', 'Trend analysis', 'Predictive scoring', 'Export reports'],
    },
    {
      id: 'cap5',
      name: 'Priority Support',
      category: 'Support',
      enabled: true,
      required: 85,
      current: 94,
      description: 'Enhanced SLA with 1-hour response time',
      features: ['Dedicated support channel', 'Priority queue', '24/7 coverage'],
    },
    {
      id: 'cap6',
      name: 'Custom Signals',
      category: 'Trust',
      enabled: true,
      required: 90,
      current: 94,
      description: 'Define and integrate custom trust signals',
      features: ['Signal builder', 'Weight customization', 'External integrations'],
    },
    {
      id: 'cap7',
      name: 'White-label Options',
      category: 'Enterprise',
      enabled: false,
      required: 98,
      current: 94,
      description: 'Custom branding and domain configuration',
      features: ['Custom domain', 'Logo customization', 'Email templates', 'UI theming'],
    },
    {
      id: 'cap8',
      name: 'Compliance Reports',
      category: 'Compliance',
      enabled: true,
      required: 85,
      current: 94,
      description: 'Automated compliance and audit reporting',
      features: ['SOC 2 reports', 'GDPR compliance', 'Audit logs', 'Data exports'],
    },
  ];

  const categories = Array.from(new Set(capabilities.map(c => c.category)));

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search capabilities..."
          className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <select className="px-2.5 py-1.5 text-xs border border-[var(--border-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex-1"></div>

        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
          <span>Current Trust Score:</span>
          <span className="font-mono text-[var(--text-primary)] font-semibold">94</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Total</span>
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">
            {capabilities.length}
          </div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Enabled</span>
          </div>
          <div className="text-xl font-semibold text-green-600 dark:text-green-500 tabular-nums">
            {capabilities.filter(c => c.enabled).length}
          </div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Locked</span>
          </div>
          <div className="text-xl font-semibold text-neutral-600 dark:text-neutral-400 tabular-nums">
            {capabilities.filter(c => !c.enabled).length}
          </div>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wide">Next Unlock</span>
          </div>
          <div className="text-xl font-semibold text-[var(--text-primary)] tabular-nums">
            {Math.min(...capabilities.filter(c => !c.enabled).map(c => c.required))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {capabilities.map((capability) => (
          <div
            key={capability.id}
            className={`bg-[var(--bg-primary)] border border-[var(--border-primary)] p-3 ${
              !capability.enabled ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-2">
                {capability.enabled ? (
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <Lock className="w-4 h-4 text-neutral-600 dark:text-neutral-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">{capability.name}</h3>
                  <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide">
                    {capability.category}
                  </span>
                </div>
              </div>
              {capability.enabled ? (
                <span className="px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-green-500/10 text-green-600 dark:text-green-500">
                  Active
                </span>
              ) : (
                <span className="px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide bg-neutral-500/10 text-neutral-600 dark:text-neutral-400">
                  Locked
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-2">{capability.description}</p>
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[var(--text-tertiary)]">Required score</span>
                <span className="font-mono text-[var(--text-secondary)]">
                  {capability.current}/{capability.required}
                </span>
              </div>
              <div className="h-1 bg-[var(--bg-secondary)] overflow-hidden">
                <div
                  className={`h-full ${
                    capability.enabled ? 'bg-green-600 dark:bg-green-500' : 'bg-neutral-600 dark:bg-neutral-400'
                  }`}
                  style={{ width: `${Math.min((capability.current / capability.required) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-1 mb-2">
              {capability.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                  <div className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            {!capability.enabled && (
              <button className="w-full px-2.5 py-1.5 text-xs border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                Unlock at {capability.required} trust score
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-500/5 border border-blue-500/20 p-3">
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-medium text-blue-600 dark:text-blue-500 mb-1">Increase Your Trust Score</h3>
            <p className="text-xs text-blue-600/80 dark:text-blue-500/80 mb-2">
              Complete additional verifications to unlock more capabilities and features.
            </p>
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              View available verifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
