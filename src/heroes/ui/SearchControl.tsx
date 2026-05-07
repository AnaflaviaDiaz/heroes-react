import { useRef } from 'react';
import { useSearchParams } from 'react-router';
import { Search, Filter, SortAsc, Grid, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdvancedFilters } from './AdvancedFilters';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';

const ID_ADVANCED_FILTERS = 'advanced-filters';
const ACTIVE_ACCORDION_SEARCH_PARAM = 'active-accordion';
const NAME_SEARCH_PARAM = 'name';

export const SearchControl = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null); // BUSCADOR DE TEXTO

  const activeAccordion = searchParams.get(ACTIVE_ACCORDION_SEARCH_PARAM) ?? ''; // ACCORDION DE FILTROS AVANZADOS

  const setQueryParams = (name: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(name, value);
      return prev;
    });
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = inputRef.current?.value;
    if (event.key === 'Enter') {
      setQueryParams(NAME_SEARCH_PARAM, value || '');
    }
  };

  const handleToggleShowAdvancedFilters = () => {
    if (activeAccordion === ID_ADVANCED_FILTERS) {
      setQueryParams(ACTIVE_ACCORDION_SEARCH_PARAM, '');
      return;
    }
    setQueryParams(ACTIVE_ACCORDION_SEARCH_PARAM, ID_ADVANCED_FILTERS);
  };

  return (
    <>
      {/* Search & Action buttons */}
      <div className='flex flex-col lg:flex-row gap-4 mb-8'>
        {/* Search */}
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
          <Input
            placeholder='Search heroes, villains, powers, teams...'
            className='pl-12 h-12 text-lg bg-white'
            ref={inputRef}
            // para detectar que el user tecleo enter
            onKeyDown={handleKeydown}
            defaultValue={searchParams.get(NAME_SEARCH_PARAM) ?? ''}
            // valor inicial, si aparece en los searchParams
          />
        </div>

        {/* Action buttons */}
        <div className='flex gap-2'>
          <Button
            variant={
              activeAccordion === ID_ADVANCED_FILTERS ? 'default' : 'outline'
            }
            className='h-12'
            onClick={handleToggleShowAdvancedFilters}
          >
            <Filter className='h-4 w-4 mr-2' />
            Filters
          </Button>

          <Button variant='outline' className='h-12'>
            <SortAsc className='h-4 w-4 mr-2' />
            Sort by Name
          </Button>

          <Button variant='outline' className='h-12'>
            <Grid className='h-4 w-4' />
          </Button>

          <Button className='h-12'>
            <Plus className='h-4 w-4 mr-2' />
            Add Character
          </Button>
        </div>
      </div>

      <Accordion type='single' collapsible value={activeAccordion}>
        <AccordionItem value={ID_ADVANCED_FILTERS}>
          {/* <AccordionTrigger>Is it accessible?</AccordionTrigger> */}
          <AccordionContent>
            <AdvancedFilters />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
