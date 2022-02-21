import Box from '@mui/material/Box';
import BannerPreview from './BannerPreview';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateZone } from '../actions/zones';
import { fetchRecord } from '../actions/fetchRecord';


const ZoneComponent = () => {
    const { zone } = useSelector( (state:any) => state );
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        getRecord();
    },[params]);

    useEffect(() => {
        console.log('zone ',zone)
    },[zone])

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
        <Box>
            <BannerPreview
                data={ zone }
            />
        </Box>
    )
}

export default ZoneComponent;