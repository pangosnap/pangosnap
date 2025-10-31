import s from './Devices.module.scss'

export const AccountDevices = () => {
  return (
    <div>
      <h3>Current device</h3>
      <div className={s.deviceItem}>
        <div className={s.deviceIcon}>
          <img src={'/chrome-icon.svg'} alt={'Chrome'} />
        </div>
        <div className={s.deviceInfo}>
          <div>Chrome</div>
          <div className={s.deviceIp}>IP: 22.345.345.12</div>
        </div>
      </div>

      <h3>Active sessions</h3>
      {[
        { name: 'Apple iMac 27', ip: '22.345.345.12', lastVisit: '22.09.2022' },
        { name: 'iPhone 14 Pro Max', ip: '22.345.345.12', lastVisit: '22.09.2022' },
      ].map((device, index) => (
        <div key={index} className={s.sessionItem}>
          <div className={s.deviceIcon}>
            <img
              src={device.name.includes('iPhone') ? '/mobile-icon.svg' : '/desktop-icon.svg'}
              alt={device.name}
            />
          </div>
          <div className={s.deviceInfo}>
            <div>{device.name}</div>
            <div className={s.deviceIp}>IP: {device.ip}</div>
            <div className={s.deviceLastVisit}>Last visit: {device.lastVisit}</div>
          </div>
          <button type={'button'} className={s.logoutButton}>
            Log Out
          </button>
        </div>
      ))}

      <div className={s.terminateAllButton}>
        <button type={'button'}>Terminate all other session</button>
      </div>
    </div>
  )
}
