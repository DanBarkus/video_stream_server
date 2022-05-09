import { FormControlLabel, FormGroup } from '@mui/material';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

import configOutline from "../config/camera_settings.json"

function VideoMenu(cameraConfig) {
    return(
        <div>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                <FormGroup>
                    {configOutline.Settings.map(function(setting){
                        switch(setting.Type) {
                            case "Slider":
                                return(
                                    <FormControlLabel control={
                                        <Slider defaultValue={setting.Default} min={setting.Min} max={setting.Max} />
                                    } label={setting.Name} />
                                )
                                break;
                            case "Toggle":
                                return(
                                    <FormControlLabel control={
                                        <Switch />
                                    } label={setting.Name} />
                                )
                                break;
                        }
                    })}  
                </FormGroup>
            </Stack>
        </div>
    );
}

export default VideoMenu;