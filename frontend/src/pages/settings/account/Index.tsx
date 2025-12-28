import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import {SettingsLayout} from "@/layouts/SettingsLayout.tsx";

export default function SettingsAccount() {
    return (
        <DashboardLayout>
            <SettingsLayout>
                <div>Account Settings</div>
            </SettingsLayout>
        </DashboardLayout>
    )
}