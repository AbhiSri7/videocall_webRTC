from django.shortcuts import render

def peer(request):

    return render(request, 'chat/peer.html', context={})