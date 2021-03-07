import React from 'react';
import { Button, useColorMode } from '@chakra-ui/react';

export default function Toggle(){
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <div>
            <Button onClick={toggleColorMode} size="sm">
                Toggle {colorMode === 'light' ? 'dark' : 'light'}
            </Button>
        </div>
    )
}