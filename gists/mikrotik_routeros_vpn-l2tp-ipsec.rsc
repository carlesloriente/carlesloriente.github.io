# Mikrotik RouterOs L2TP/IPSec VPN Full configuration
#
/interface bridge
add fast-forward=no name=bridge

/interface ethernet
set [ find default-name=ether1 ] advertise=10M-half,10M-full,100M-half,100M-full,1000M-half,1000M-full
/interface bridge port
add bridge=bridge hw=no interface=ether1

/snmp community
set [ find default=yes ] addresses=0.0.0.0/0

/system clock
set time-zone-name=Europe/Dublin

/system identity
set name=mikrotik_vpn
/system ntp client
set enabled=yes server-dns-names=pool.ntp.org

/ip service
set telnet disabled=yes
set ftp disabled=yes
set www disabled=yes
set api disabled=yes
set api-ssl disabled=yes

/ip pool
add name=pool-vpn ranges=1.0.0.200-1.0.0.254
add name=pool-l2tp-vpn ranges=2.0.0.200-2.0.0.254

/ip ipsec peer
add name=l2tpserver passive=yes
/ip ipsec proposal
set [ find default=yes ] enc-algorithms=3des

/ip ipsec mode-config
add address-pool=pool-vpn name=cfg1 static-dns=8.8.8.8 system-dns=no
/ppp profile
add bridge=interface-local-bridge local-address=2.0.0.1 name=profile-l2tp-vpn remote-address=pool-l2tp-vpn
add bridge=interface-local-bridge dns-server=8.8.8.8 local-address=pool-l2tp-vpn name=ipsec_vpn remote-address=pool-l2tp-vpn

/interface l2tp-server server 
set authentication=mschap2 default-profile=ipsec_vpn enabled=yes
/ip dhcp-client
add !dhcp-options disabled=no interface=ether1
add disabled=no interface=bridge

/ip firewall filter 
add action=accept chain=input protocol=ipsec-esp comment="FIREWALL FILTER RULE - L2TP SERVER"
add chain=input action=accept protocol=udp port=1701,500,4500
/ip firewall nat 
add action=masquerade chain=srcnat out-interface=interface-local-bridge src-address=2.0.0.200-3.0.0.254
add action=accept chain=srcnat

/ip ipsec identity 
add generate-policy=port-override peer=l2tpserver secret="YourSecret"

/ppp secret 
add name=vpn_user password="YourPassword" profile=profile-l2tp-vpn service=any
