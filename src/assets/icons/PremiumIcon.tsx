import { createSvgIcon } from '@mui/material/utils';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export const PremiumIcon = (props:SvgIconProps) => {
    return(
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </SvgIcon>
    )
}