import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const STRENGTH_SEARCH_PARAM = 'strength';

export const AdvancedFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedStrength = +(searchParams.get(STRENGTH_SEARCH_PARAM) || 0); // SLIDER DE FUERZA
  const [slider, setSlider] = useState(selectedStrength);

  const setQueryParams = (name: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(name, value);
      return prev;
    });
  };

  const handleClearAll = () => {
    setSearchParams((prev) => {
      prev.delete(STRENGTH_SEARCH_PARAM);
      return prev;
    });
  };

  // debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setQueryParams(STRENGTH_SEARCH_PARAM, slider.toString());
    }, 500); // wait 500ms after last keystroke

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slider]);

  return (
    <div className='bg-white rounded-lg p-6 mb-8 shadow-sm border'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-semibold'>Advanced Filters</h3>
        <Button onClick={handleClearAll} variant='ghost'>
          Clear All
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Team</label>
          <div className='h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
            All teams
          </div>
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Category</label>
          <div className='h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
            All categories
          </div>
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Universe</label>
          <div className='h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
            All universes
          </div>
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Status</label>
          <div className='h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
            All statuses
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <label className='text-sm font-medium'>
          Minimum Strength: {slider}/10
        </label>
        <Slider
          value={[slider]}
          max={10}
          step={1}
          onValueChange={(value) => setSlider(value[0])}
        />
      </div>
    </div>
  );
};
