'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSystem, setTempUnit, setSpeedUnit, setPrecipUnit } from '@/store/features/settings/settingsSlice';
import Dropdown, { DropdownItem } from '../core/Dropdown';
import { cn } from '@/lib/utils';

export default function UnitSelector() {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.settings);

    const renderCheckmark = (isSelected: boolean) => isSelected && <img src="/images/icon-checkmark.svg" alt="Selected" className="h-4 w-4 ml-auto" />;

    return (
        <Dropdown 
            className="w-64"
            trigger={
                <button className="flex items-center gap-2 rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium hover:bg-neutral-700 transition-colors">
                    <img src="/images/icon-units.svg" alt="Units" className="h-5 w-5"/>
                    Units
                    <img src="/images/icon-dropdown.svg" alt="Dropdown" className="h-4 w-4"/>
                </button>
            }
        >
            <div className='px-4 py-2 text-xs text-neutral-300'>System</div>
            <DropdownItem onClick={() => dispatch(setSystem('Metric'))}
                className={cn(settings.system === 'Metric' && 'bg-neutral-700')}
                >
                <span className={cn(settings.system === 'Metric' && '')}>Metric</span>
                {renderCheckmark(settings.system === 'Metric')}
            </DropdownItem>
            <DropdownItem onClick={() => dispatch(setSystem('Imperial'))}
                className={cn(settings.system === 'Imperial' && 'bg-neutral-700')}
                >
                 <span className={cn(settings.system === 'Imperial' && '')}>Imperial</span>
                {renderCheckmark(settings.system === 'Imperial')}
            </DropdownItem>

            <div className='border-t border-neutral-700 my-1'></div>

            <div className='px-4 py-2 text-xs text-neutral-300'>Temperature</div>
            <DropdownItem onClick={() => dispatch(setTempUnit('C'))}
                className={cn(settings.tempUnit === 'C' && 'bg-neutral-700')}
                >
                <span className={cn(settings.tempUnit === 'C' && '')}>Celsius (°C)</span>
                {renderCheckmark(settings.tempUnit === 'C')}
            </DropdownItem>
            <DropdownItem onClick={() => dispatch(setTempUnit('F'))}
                className={cn(settings.tempUnit === 'F' && 'bg-neutral-700')}
                >
                <span className={cn(settings.tempUnit === 'F' && '')}>Fahrenheit (°F)</span>
                {renderCheckmark(settings.tempUnit === 'F')}
            </DropdownItem>
             
            <div className='border-t border-neutral-700 my-1'></div>

            <div className='px-4 py-2 text-xs text-neutral-300'>Wind Speed</div>
             <DropdownItem onClick={() => dispatch(setSpeedUnit('km/h'))}
                className={cn(settings.speedUnit === 'km/h' && 'bg-neutral-700')}
                >
                <span className={cn(settings.speedUnit === 'km/h' && '')}>km/h</span>
                {renderCheckmark(settings.speedUnit === 'km/h')}
            </DropdownItem>
            <DropdownItem onClick={() => dispatch(setSpeedUnit('mph'))}
                className={cn(settings.speedUnit === 'mph' && 'bg-neutral-700')}
                >
                <span className={cn(settings.speedUnit === 'mph' && '')}>mph</span>
                {renderCheckmark(settings.speedUnit === 'mph')}
            </DropdownItem>

            <div className='border-t border-neutral-700 my-1'></div>
            
            <div className='px-4 py-2 text-xs text-neutral-300'>Precipitation</div>
             <DropdownItem onClick={() => dispatch(setPrecipUnit('mm'))}
                className={cn(settings.precipUnit === 'mm' && 'bg-neutral-700')}
                >
                <span className={cn(settings.precipUnit === 'mm' && '')}>Millimeters (mm)</span>
                {renderCheckmark(settings.precipUnit === 'mm')}
            </DropdownItem>
            <DropdownItem onClick={() => dispatch(setPrecipUnit('in'))}
                className={cn(settings.precipUnit === 'in' && 'bg-neutral-700')}
                >
                <span className={cn(settings.precipUnit === 'in' && '')}>Inches (in)</span>
                {renderCheckmark(settings.precipUnit === 'in')}
            </DropdownItem>

        </Dropdown>
    );
}
