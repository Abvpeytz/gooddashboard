import Card from '@/app/ui/dashboard/card';

export default function Page() {
  return (
    <div className='good-dashboard__dashboard grid grid-rows-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-1 gap-4'>
      <Card title="Online Safety" bgColor='bg-brand-100' progressStatus={80}/>
      <Card title="Time Registration" bgColor='bg-brand-200' progressStatus={60} />
      <Card title="Code Quality" bgColor='bg-brand-300' />
      <Card title="Client Workflows" bgColor='bg-brand-400' textColor='text-white' progressStatus={45} />
    </div>
  );
}
