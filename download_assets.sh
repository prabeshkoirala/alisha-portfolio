#!/bin/bash
mkdir -p public/images

# Download Portrait
curl -L -o public/images/portrait.jpg "https://lh3.googleusercontent.com/aida-public/AB6AXuBHLv53a9st3puHttd_TCogLNEieFV9knGV1yZy-rmL5VVVnpqhByFHPEC8ZEIGBBpu4PktjNZgaJR4XWEoIpG_XpnpfPyDH4MNEZCeydLMaalGBEWUmdmgvu1EEKHIsJogVWaCWsDWck9nZb5MgWFGqNMFNIW8DlNIT0iR8shnpwuS1MhIoL98nRKREvN-xiYnEtxNCUrLJLxb%20fEDBq8cw4vtjEL7X57Txe1Faj1wP_ZLEuvghqYlrXCU7L773hH3dozcSYU0bfV4"

# Download Background
curl -L -o public/images/background.jpg "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"

echo "Assets downloaded to public/images/"
