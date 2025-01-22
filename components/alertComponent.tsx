import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AlertComponentProps {
    title: string
    description: string
}

const AlertComponent = ({ title, description }: AlertComponentProps) => {
    return (
        <div>
            <Alert>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {description}
                </AlertDescription>
            </Alert>
        </div>
    )
}

export default AlertComponent