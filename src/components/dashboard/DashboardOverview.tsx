import React from 'react';
import { useFinanceData } from '../../store';
import { formatCurrency } from '../../lib/utils';
import { Wallet, TrendingUp, TrendingDown, Target, Activity } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

export function DashboardOverview() {
  const { transactions, baseCurrency, project } = useFinanceData();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Simple mock data for chart if transactions are empty
  const chartData = transactions.length > 0 
    ? transactions.slice(0, 10).map((t, i) => ({
        name: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: t.type === 'income' ? t.amount : -t.amount,
        balance: balance - (transactions.length - i) * 100 // mock running balance calculation
      })).reverse()
    : [
        { name: 'Jan', balance: 4000 },
        { name: 'Feb', balance: 3000 },
        { name: 'Mar', balance: 5000 },
        { name: 'Apr', balance: 4500 },
        { name: 'May', balance: 6000 },
        { name: 'Jun', balance: 5500 },
      ];

  const stats = [
    {
      name: 'Total Balance',
      value: balance,
      icon: Wallet,
      change: '+4.75%',
      trend: 'up',
    },
    {
      name: 'Total Income',
      value: totalIncome,
      icon: TrendingUp,
      change: '+10.2%',
      trend: 'up',
    },
    {
      name: 'Total Expenses',
      value: totalExpense,
      icon: TrendingDown,
      change: '-2.4%',
      trend: 'down',
    },
    {
      name: 'Project Budget',
      value: project?.budget || 0,
      icon: Target,
      change: project ? 'Active' : 'Not Set',
      trend: 'neutral',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-serif text-zinc-100 italic">Overview</h2>
          <p className="text-zinc-500 mt-1">Summary of your financial performance.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-5 py-2.5 bg-zinc-100 text-zinc-950 text-sm font-semibold rounded-lg">Export Report</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{stat.name}</p>
              <stat.icon className="h-4 w-4 text-zinc-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl text-zinc-100 font-serif tracking-tight">
                {formatCurrency(stat.value, baseCurrency)}
              </h3>
            </div>
            <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="bg-zinc-300 h-full w-[70%]"></div>
            </div>
            <div className="mt-3 flex items-center text-sm">
              <span
                className={`font-medium ${
                  stat.trend === 'up'
                    ? 'text-emerald-500'
                    : stat.trend === 'down'
                    ? 'text-rose-500'
                    : 'text-zinc-500'
                }`}
              >
                {stat.change}
              </span>
              <span className="ml-2 text-zinc-600">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-zinc-100 tracking-tight">Cash Flow Overview</h2>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Running balance</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-xs font-semibold rounded bg-zinc-800 text-zinc-100">6M</button>
              <button className="px-3 py-1 text-xs font-semibold rounded text-zinc-500 hover:text-zinc-300">1Y</button>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e4e4e7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#e4e4e7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #27272a', color: '#f4f4f5' }}
                  itemStyle={{ color: '#f4f4f5' }}
                  formatter={(value: number) => [formatCurrency(value, baseCurrency), 'Balance']}
                />
                <Area type="monotone" dataKey="balance" stroke="#e4e4e7" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col">
          <div className="px-8 py-5 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
            <h4 className="text-sm font-semibold text-zinc-100 tracking-tight">Recent Activity</h4>
            <button className="text-xs text-zinc-500 hover:text-zinc-300 uppercase tracking-tighter font-bold transition-colors">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {transactions.length > 0 ? (
              <table className="w-full text-left">
                <tbody className="text-sm">
                  {transactions.slice(0, 5).map((tx) => (
                    <tr key={tx.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                      <td className="px-8 py-4">
                        <div className="text-zinc-100 font-medium">{tx.description}</div>
                        <div className="text-zinc-500 text-xs mt-1">{new Date(tx.date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="text-zinc-300">
                          {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount, tx.displayCurrency)}
                        </div>
                        <div className="mt-1">
                          {tx.type === 'income' ? (
                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded uppercase">Income</span>
                          ) : (
                            <span className="px-2 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-bold rounded uppercase">Expense</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-3 p-8">
                <Activity className="h-10 w-10 opacity-20" />
                <p className="text-sm">No recent transactions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
