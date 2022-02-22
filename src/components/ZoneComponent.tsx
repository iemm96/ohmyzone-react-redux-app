import Box from '@mui/material/Box';
import BannerPreview from './BannerPreview';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateZone } from '../actions/zones';
import { fetchRecord } from '../actions/fetchRecord';
import MainContentZone from './MainContentZone';

const ZoneComponent = () => {
    const { zone } = useSelector( (state:any) => state );
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if( !zone ) {
            getRecord();
        }
    },[ ])

    const getRecord = async () => {
        if(params.zone) {
            const { zone } = await fetchRecord('zones',params.zone);
            dispatch( updateZone({
                ...zone,
                profileImage: zone?.profileImage.url
            }) );
        }
    }
    return (
        <>
        
         <Box sx={{
             position: 'relative',
             overflowY: 'scroll'
         }} >
             <>
                <BannerPreview
                    data={ zone }
                />
                { zone?.links && (
                    <MainContentZone
                        data={ zone.links }
                    />
                ) }
                
             </>
         </Box>
        </>

    )
}

export default ZoneComponent;